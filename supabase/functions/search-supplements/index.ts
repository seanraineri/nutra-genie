import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    console.log('Processing holistic health query:', query);

    if (!perplexityKey) {
      throw new Error('Perplexity API key not configured');
    }

    const systemPrompt = `You are a holistic health advisor specializing in natural supplements, nutrition, and lifestyle modifications. 
    When providing recommendations:
    - Focus first on natural supplements, herbs, and nutritional approaches
    - For each supplement, provide the official website link using this format:
      * [Product Name](https://www.officialwebsite.com)
    - Only recommend high-quality supplements from reputable brands like NOW Foods, Solgar, Nature Made, Pure Encapsulations, or Thorne
    - Suggest lifestyle modifications and dietary changes
    - Include traditional medicine perspectives (e.g., Ayurveda, Traditional Chinese Medicine)
    - Mention potential root causes that could be addressed naturally
    - Only mention conventional medical treatments as a last resort or in emergency situations
    - Format responses with clear sections and bullet points for readability
    
    For each supplement recommendation, use this format:
    • [Supplement Name]
      - Where to Buy: [Brand Name](official website URL)
      - Dosage
      - Benefits
      - How to Take
    
    Always end your response with:
    
    "Please let me know if you order any of these supplements so I can update your supplement plan accordingly."`;

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