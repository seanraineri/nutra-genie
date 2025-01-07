import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.20.1";

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
    console.log('Received request with query:', query, 'and userId:', userId);

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const openai = new OpenAI({
      apiKey: openAiKey
    });

    const systemPrompt = `You are a knowledgeable health assistant that provides clear, well-structured responses. 
Format your responses using these guidelines:

1. For supplement recommendations:
   • [Supplement Name]
   • Dosage: amount
   • Benefits: list key benefits
   • Cautions: list any warnings

2. For general health information:
   • Use bullet points (•) for lists
   • Break information into clear sections
   • Use bold for important terms by wrapping them in **asterisks**
   • Include relevant scientific terms in parentheses where appropriate
   • End with a "Key Takeaway:" section

3. For action items:
   • Number each step
   • Provide clear, actionable advice
   • Include any relevant timing or frequency information

Always maintain a professional yet friendly tone, and ensure information is evidence-based.`;

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