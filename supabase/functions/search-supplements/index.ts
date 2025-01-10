import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4.20.1";

const openAiKey = Deno.env.get('OPENAI_API_KEY');

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

async function searchSupplementBrands(openai: OpenAI, supplementName: string) {
  console.log('Searching supplement brands for:', supplementName);
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a supplement research assistant focused on US brands and products. For ${supplementName} supplements specifically, provide:
1. Brand name and specific product name
2. One key advantage of this specific product
3. One potential consideration
4. Price in USD (approximate)
5. Product URL (use Amazon.com URLs when possible)

Limit to 3 top US-based recommendations. Format each recommendation as:

• [Brand Name - Product Name](product-url)
  - Advantage: [key advantage]
  - Consideration: [potential consideration]
  - Price: $XX.XX`
        },
        {
          role: "user",
          content: `Find reputable US-based ${supplementName} supplement brands and products.`
        }
      ],
      temperature: 0.2,
    });

    return completion.choices[0].message.content;
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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const openai = new OpenAI({ apiKey: openAiKey });

    const isAskingForBrands = query.toLowerCase().includes('find supplement') || 
                             query.toLowerCase().includes('show me') ||
                             query.toLowerCase().includes('search for') ||
                             query.toLowerCase().includes('yes');

    if (isAskingForBrands) {
      const supplementName = await extractSupplementName(query);
      console.log('Extracted supplement name:', supplementName);
      
      const brandsResult = await searchSupplementBrands(openai, supplementName);
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
"Would you like me to search for specific ${extractSupplementName(query)} supplement brands from US companies?"`
      },
      {
        role: "user",
        content: query
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    console.log('OpenAI response received');

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