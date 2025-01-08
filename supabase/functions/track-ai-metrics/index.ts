import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      userId,
      recommendationId,
      feedback,
      isHelpful,
      followedRecommendation,
      budgetFit,
      additionalNotes 
    } = await req.json();

    if (!userId || !recommendationId) {
      throw new Error('User ID and recommendation ID are required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Log the feedback
    const { error: insertError } = await supabase
      .from('ai_performance_metrics')
      .insert({
        user_id: userId,
        recommendation_id: recommendationId,
        feedback,
        is_helpful: isHelpful,
        followed_recommendation: followedRecommendation,
        budget_fit: budgetFit,
        additional_notes: additionalNotes
      });

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in track-ai-metrics function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});