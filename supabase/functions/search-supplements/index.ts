import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();
    console.log('Processing holistic health query:', query);

    if (!perplexityKey) {
      throw new Error('Perplexity API key not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch user's health profile including budget
    const { data: profile, error: profileError } = await supabase
      .from('user_health_profiles')
      .select('monthly_supplement_budget, medical_conditions, current_medications')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      throw new Error('Could not fetch user profile');
    }

    const monthlyBudget = profile?.monthly_supplement_budget;
    const medicalConditions = profile?.medical_conditions || [];
    const currentMedications = profile?.current_medications || [];

    console.log('User monthly budget:', monthlyBudget);
    console.log('Medical conditions:', medicalConditions);
    console.log('Current medications:', currentMedications);

    // Fetch current supplement recommendations to track total cost
    const { data: currentSupplements, error: supplementsError } = await supabase
      .from('supplement_recommendations')
      .select('supplement_name, estimated_cost')
      .eq('user_id', userId);

    if (supplementsError) {
      console.error('Error fetching current supplements:', supplementsError);
    }

    const currentTotalCost = currentSupplements?.reduce((sum, sup) => sum + (sup.estimated_cost || 0), 0) || 0;
    console.log('Current total supplement cost:', currentTotalCost);

    const budgetContext = monthlyBudget 
      ? `The user has a monthly supplement budget of $${monthlyBudget}, with current supplement costs of $${currentTotalCost.toFixed(2)}. Please ensure new recommendations stay within the remaining budget of $${(monthlyBudget - currentTotalCost).toFixed(2)}.`
      : 'No specific budget set. Please include estimated monthly costs for each supplement recommendation.';

    const medicalContext = `
      Medical Conditions: ${medicalConditions.length ? medicalConditions.join(', ') : 'None reported'}
      Current Medications: ${currentMedications.length ? currentMedications.join(', ') : 'None reported'}
    `;

    const systemPrompt = `You are a holistic health advisor specializing in natural supplements, nutrition, and lifestyle modifications. 
    Your recommendations should be based on both traditional wisdom and modern scientific research.
    
    ${budgetContext}
    ${medicalContext}
    
    When providing recommendations:
    1. First check for any contraindications with current medications
    2. Prioritize essential supplements if budget is limited
    3. For each supplement recommendation, include:
       - Exact product name and brand
       - Monthly cost estimate
       - Recommended dosage
       - Expected benefits
       - Priority level (1-5)
       - Any potential interactions with current medications
    4. Format costs clearly with dollar amounts
    5. Consider bulk purchase options for cost savings
    6. Format responses with clear sections and bullet points for readability`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API error:', errorData);
      throw new Error(`Perplexity API error: ${errorData}`);
    }

    const result = await response.json();
    console.log('Successfully got holistic health response from Perplexity');

    // Update supplement recommendations with cost information
    if (result.choices && result.choices[0]?.message?.content) {
      const content = result.choices[0].message.content;
      const matches = content.match(/\$\d+(\.\d{2})?/g);
      if (matches) {
        console.log('Found cost information in recommendations:', matches);
      }
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-supplements function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});