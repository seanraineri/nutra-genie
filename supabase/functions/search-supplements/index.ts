import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function extractSupplementName(query: string): Promise<string> {
  const patterns = [
    /search for (.*?) supplements/i,
    /find (.*?) supplements/i,
    /tell me about (.*?) supplements/i,
    /show me (.*?) supplements/i,
    /(.*?) benefits/i,
    /supplements? for (.*?)/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return query.toLowerCase().replace('supplements', '').trim();
}

async function searchSupplementBrands(supplementName: string) {
  console.log('Searching natural supplement brands with Perplexity for:', supplementName);
  
  try {
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
            content: `You are a natural health and supplement advisor focused on holistic remedies and US-based natural supplement brands. For ${supplementName}, provide 3 top natural supplement recommendations in this exact format:

• [Brand Name - Natural Product Name](product-url)
  - Natural Benefit: [key natural benefit]
  - Source: [natural source or ingredient]
  - Price: $XX.XX

Make sure to include real, working product URLs from major natural health retailers like iHerb, Vitacost, or natural supplement manufacturers' websites. Focus only on natural, plant-based, or holistic supplements.`
          },
          {
            role: 'user',
            content: `Find natural, holistic supplement recommendations for ${supplementName}.`
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Perplexity API response:', data);

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error searching supplement brands:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();
    console.log('Received request with query:', query);

    if (!perplexityKey) throw new Error('PERPLEXITY_API_KEY is not set');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const isAskingForBrands = query.toLowerCase().includes('find supplement') || 
                             query.toLowerCase().includes('show me') ||
                             query.toLowerCase().includes('search for') ||
                             query.toLowerCase().includes('yes');

    if (isAskingForBrands) {
      const supplementName = await extractSupplementName(query);
      console.log('Extracted supplement name:', supplementName);
      
      const brandsResult = await searchSupplementBrands(supplementName);
      return new Response(
        JSON.stringify({ 
          choices: [{ 
            message: { 
              content: brandsResult 
            } 
          }] 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For general supplement information queries
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
            content: `You are a natural health advisor focused on holistic remedies and natural supplements. When discussing health concerns:

1. Start with Natural Solutions:
   • Recommend natural supplements and herbs
   • Suggest dietary changes
   • Include lifestyle modifications

2. Provide Scientific Context:
   • How natural remedies work
   • Traditional uses in different cultures
   • Recommended natural dosage ranges

3. Safety Information:
   • Natural alternatives to consider
   • Herb-drug interactions (if any)
   • When to seek professional holistic health advice

Focus exclusively on natural, holistic approaches. Do not recommend pharmaceutical drugs or conventional medical treatments. Instead, emphasize natural supplements, herbs, dietary changes, and lifestyle modifications.

End your response by asking:
"Would you like me to search for specific natural ${extractSupplementName(query)} supplement brands from US companies?"`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Perplexity API response:', data);

    await supabaseClient
      .from('chat_history')
      .insert([
        {
          user_id: userId,
          message: query,
          role: 'user'
        },
        {
          user_id: userId,
          message: data.choices[0].message.content,
          role: 'assistant'
        }
      ]);
    
    console.log('Chat history stored');

    return new Response(
      JSON.stringify({ choices: [{ message: { content: data.choices[0].message.content } }] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in search-supplements function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});