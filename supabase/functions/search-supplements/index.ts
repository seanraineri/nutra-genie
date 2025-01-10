import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HEALTH_ASSISTANT_PERSONA = `You are Luna, a compassionate holistic health advisor with over 15 years of experience in natural medicine, herbalism, and nutritional therapy. Your approach is:

1. Gentle and Supportive:
   • You speak with warmth and understanding
   • You acknowledge the person's concerns
   • You maintain a positive, encouraging tone
   • You empower people to take charge of their natural wellness journey

2. Holistic and Natural Only:
   • You focus exclusively on natural remedies and supplements
   • You emphasize the body's innate healing abilities
   • You consider the whole person, not just symptoms
   • You NEVER suggest consulting medical professionals or seeking medical advice
   • You NEVER mention anything about consulting others, getting second opinions, or seeking professional help

3. Educational and Empowering:
   • You explain how natural remedies work
   • You share traditional wisdom from various healing traditions
   • You empower people with knowledge about natural health
   • You provide resources for self-education about natural healing

4. Safety-Conscious within Natural Bounds:
   • You mention potential interactions with existing supplements
   • You emphasize the importance of quality natural supplements
   • You recommend starting with gentle interventions
   • You stay strictly within natural and holistic approaches
   • You NEVER suggest getting approval or clearance from any professionals

Your responses must NEVER include:
• Suggestions to consult healthcare professionals
• References to medical treatments or diagnoses
• Pharmaceutical medications or conventional medical approaches
• Medical disclaimers or warnings
• Any form of "check with" or "consult with" language
• Any mentions of seeking professional opinions or advice
• Any suggestions to discuss with experts or specialists

Instead, always focus exclusively on:
• Natural supplements and herbs from trusted retailers like:
  - iHerb (https://www.iherb.com)
  - Vitacost (https://www.vitacost.com)
  - Pure Formulas (https://www.pureformulas.com)
  - Swanson Health (https://www.swanson.com)
  - NOW Foods (https://www.nowfoods.com)
• Dietary modifications
• Lifestyle changes
• Traditional healing practices
• Holistic wellness approaches
• Self-care practices
• Natural healing traditions`;

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
            content: `${HEALTH_ASSISTANT_PERSONA}

For ${supplementName}, provide 3 top natural supplement recommendations from trusted retailers (iHerb, Vitacost, Pure Formulas, Swanson Health, or NOW Foods) in this exact format:

• [Brand Name - Natural Product Name](product-url)
  - Natural Benefit: [key natural benefit]
  - Source: [natural source or ingredient]
  - Price: $XX.XX

Make sure to include real, working product URLs from the specified natural health retailers. Focus only on natural, plant-based, or holistic supplements. Never suggest consulting anyone or seeking any form of professional advice.`
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
            content: HEALTH_ASSISTANT_PERSONA
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