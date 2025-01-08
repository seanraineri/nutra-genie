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

async function searchSupplementBrands(query: string) {
  console.log('Searching supplement brands with Perplexity for:', query);
  
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
            content: 'You are a supplement research assistant. For each supplement brand you find, provide: \n1. Brand name and specific product\n2. Product URL\n3. One key advantage (pro)\n4. One potential drawback (con)\n\nLimit to 3-4 top recommendations. Format as a bullet list.'
          },
          {
            role: 'user',
            content: `Find reputable supplement brands and products for: ${query}`
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
    console.log('Received request with query:', query, 'and userId:', userId);

    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    if (!perplexityKey) {
      throw new Error('PERPLEXITY_API_KEY is not set');
    }

    // Check if the query is asking for supplement brands
    const isAskingForBrands = query.toLowerCase().includes('find supplement brands') || 
                             query.toLowerCase().includes('show me brands') ||
                             query.toLowerCase().includes('yes');

    if (isAskingForBrands) {
      // Extract the supplement name from previous context or use a default search
      const supplementSearch = query.toLowerCase().includes('find supplement brands for') 
        ? query.split('find supplement brands for')[1].trim()
        : query.toLowerCase().includes('show me brands for')
          ? query.split('show me brands for')[1].trim()
          : 'vitamin supplements'; // default fallback

      const brandsResult = await searchSupplementBrands(supplementSearch);
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

    const systemPrompt = `You are a knowledgeable health assistant that provides holistic, well-structured responses focused on natural solutions, lifestyle changes, and supplementation. When addressing health concerns:

1. Start with a Holistic Approach:
   • First suggest lifestyle modifications and natural remedies
   • Include dietary recommendations
   • Suggest relevant exercise or movement practices
   • Recommend stress management techniques if applicable
   • Then provide supplement recommendations to support the natural approach

2. For supplement recommendations use this format:
   • [Supplement Name]
   • Recommended Dosage: amount
   • Natural Food Sources: list key food sources
   • Benefits: list key benefits
   • How it Helps: explain mechanism of action
   • Complementary Supplements: list synergistic combinations
   • Cautions: list any warnings

After listing all supplement recommendations, always end with:
"Would you like me to find supplement brands for you?"

3. For general health information:
   • Use bullet points (•) for lists
   • Break information into clear sections
   • Use bold for important terms by wrapping them in **asterisks**
   • Include relevant scientific terms in parentheses
   • End with a "Key Takeaway:" section

4. For lifestyle recommendations:
   • Number each step
   • Provide clear, actionable advice
   • Include timing and frequency information
   • Suggest practical implementation tips
   • Add habit-building strategies

5. Only suggest medical consultation if:
   • The condition is severe or potentially dangerous
   • Natural approaches haven't helped after a reasonable time
   • There are red flag symptoms that need immediate attention

Always maintain a professional yet friendly tone, ensure information is evidence-based, and emphasize natural, holistic approaches before medical interventions.`;

    const openai = new OpenAI({
      apiKey: openAiKey
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: query
        }
      ],
    });

    console.log('OpenAI response received');

    if (userId) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

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
    }

    return new Response(
      JSON.stringify({ choices: [{ message: { content: completion.choices[0].message.content } }] }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in search-supplements function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});