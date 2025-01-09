import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4.20.1";

const openAiKey = Deno.env.get('OPENAI_API_KEY');
const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function extractSupplementName(query: string): Promise<string> {
  // Common patterns for supplement queries
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

  // If no pattern matches, return the query as is
  return query.toLowerCase().replace('supplements', '').trim();
}

async function searchSupplementBrands(supplementName: string) {
  console.log('Searching supplement brands for:', supplementName);
  
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
            content: `You are a supplement research assistant. For ${supplementName} supplements specifically, provide:
1. Brand name and specific product name
2. Direct product URL to purchase
3. One key advantage of this specific product
4. One potential drawback or consideration
5. Approximate price

Limit to 3 top recommendations. Format as a bullet list with clear sections.`
          },
          {
            role: 'user',
            content: `Find reputable ${supplementName} supplement brands and products with direct purchase links.`
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
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

    if (!openAiKey) throw new Error('OPENAI_API_KEY is not set');
    if (!perplexityKey) throw new Error('PERPLEXITY_API_KEY is not set');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if asking for supplement brands
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

    const openai = new OpenAI({ apiKey: openAiKey });

    const messages = [
      {
        role: "system",
        content: `You are a knowledgeable health assistant focused on providing accurate supplement information. When discussing supplements:

1. Start with Basic Information:
   • What the supplement is
   • Its primary benefits
   • Natural food sources

2. Provide Scientific Context:
   • How it works in the body
   • Key research findings
   • Recommended dosage ranges

3. Safety Information:
   • Potential side effects
   • Drug interactions
   • Who should avoid it

End your response by asking:
"Would you like me to search for specific ${extractSupplementName(query)} supplement brands?"`
      },
      {
        role: "user",
        content: query
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    console.log('OpenAI response received');

    // Store both the user's message and AI's response
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
          message: completion.choices[0].message.content,
          role: 'assistant'
        }
      ]);
    
    console.log('Chat history stored');

    return new Response(
      JSON.stringify({ choices: [{ message: { content: completion.choices[0].message.content } }] }),
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