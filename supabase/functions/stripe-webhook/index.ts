import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) throw new Error('No signature found');

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    // Check if event was already processed
    const { data: existingEvent } = await supabase
      .from('webhook_events')
      .select()
      .eq('stripe_event_id', event.id)
      .single();

    if (existingEvent) {
      return new Response(JSON.stringify({ message: 'Event already processed' }), { status: 200 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_email;

      // Get pending profile
      const { data: pendingProfile } = await supabase
        .from('pending_health_profiles')
        .select('*')
        .eq('email', customerEmail)
        .single();

      if (!pendingProfile) {
        throw new Error('No pending profile found');
      }

      // Create user account
      const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
        email: customerEmail,
        password: pendingProfile.password,
        email_confirm: true
      });

      if (signUpError) throw signUpError;

      // Create health profile
      await supabase.from('user_health_profiles').insert({
        user_id: user.id,
        age: pendingProfile.age,
        gender: pendingProfile.gender,
        height: pendingProfile.height,
        weight: pendingProfile.weight,
        medical_conditions: pendingProfile.medical_conditions,
        allergies: pendingProfile.allergies,
        current_medications: pendingProfile.current_medications
      });

      // Create subscription record
      await supabase.from('user_subscriptions').insert({
        user_id: user.id,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        status: 'active',
        current_period_end: new Date(session.expires_at * 1000)
      });

      // Generate initial supplement recommendations
      await supabase.functions.invoke('analyze-health-data', {
        body: { userId: user.id }
      });

      // Delete pending profile
      await supabase
        .from('pending_health_profiles')
        .delete()
        .eq('email', customerEmail);
    }

    // Record webhook event
    await supabase.from('webhook_events').insert({
      stripe_event_id: event.id,
      type: event.type
    });

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});