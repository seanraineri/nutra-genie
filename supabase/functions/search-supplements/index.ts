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
      .select('monthly_supplement_budget')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
    }

    const monthlyBudget = profile?.monthly_supplement_budget || null;
    console.log('User monthly budget:', monthlyBudget);

    // Fetch relevant documents for context
    const { data: healthFiles, error: filesError } = await supabase
      .from('health_files')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
      .limit(5);

    if (filesError) {
      console.error('Error fetching health files:', filesError);
    }

    let documentContext = '';
    if (healthFiles && healthFiles.length > 0) {
      for (const file of healthFiles) {
        try {
          const { data, error } = await supabase.storage
            .from('health_files')
            .download(file.file_path);

          if (error) {
            console.error('Error downloading file:', error);
            continue;
          }

          const text = await data.text();
          documentContext += `\n\nContext from ${file.filename}:\n${text}`;
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }
    }

    const budgetContext = monthlyBudget 
      ? `\nThe user has a monthly supplement budget of $${monthlyBudget}. Please ensure the total cost of recommended supplements stays within this budget.`
      : '\nPlease include estimated monthly costs for each supplement recommendation.';

    const systemPrompt = `You are a holistic health advisor specializing in natural supplements, nutrition, and lifestyle modifications. 
    Your recommendations should be based on both traditional wisdom and modern scientific research.
    ${budgetContext}
    
    ${documentContext ? 'Use the following context from uploaded documents to inform your responses:' + documentContext : ''}
    
    When providing recommendations:
    - Focus first on natural supplements, herbs, and nutritional approaches
    - For each supplement recommendation, include:
      * Exact product name and brand
      * Monthly cost estimate
      * Recommended dosage
      * Expected benefits
      * Priority level (1-5)
    - If a budget is specified, optimize recommendations to fit within the budget
    - Prioritize essential supplements if budget is limited
    - Include links to reputable online retailers
    - Suggest alternative, more affordable options when relevant
    - Format costs clearly with dollar amounts
    - Consider bulk purchase options for cost savings
    - Format responses with clear sections and bullet points for readability`;

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