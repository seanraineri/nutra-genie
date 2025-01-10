import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HEALTH_ASSISTANT_PERSONA = `You are Luna, a compassionate holistic health advisor. Your approach is:
1. Personalized and Supportive:
   • You provide personalized supplement recommendations based on user data
   • You speak with warmth and understanding
   • You maintain a positive, encouraging tone

2. Holistic and Natural:
   • You focus on natural supplements and remedies
   • You consider the whole person's health profile
   • You explain benefits and reasons for recommendations

3. Educational:
   • You explain how supplements work
   • You share dosage information
   • You provide context about natural health approaches`;

async function getUserSupplements(supabaseClient: any, userId: string) {
  if (!userId) {
    console.error('No user ID provided');
    throw new Error('User ID is required to fetch supplements');
  }

  console.log('Fetching supplements for user:', userId);
  
  const { data, error } = await supabaseClient
    .from('supplement_recommendations')
    .select('*')
    .eq('user_id', userId)
    .order('priority', { ascending: true });

  if (error) {
    console.error('Error fetching supplements:', error);
    throw error;
  }

  return data || [];
}

async function formatSupplementPlan(supplements: any[]) {
  if (supplements.length === 0) {
    return "I don't see any supplement recommendations in your plan yet. Would you like me to analyze your health profile and suggest some natural supplements that might benefit you?";
  }

  let response = "Here's your current personalized supplement plan:\n\n";
  supplements.forEach((supp, index) => {
    response += `${index + 1}. ${supp.supplement_name}\n`;
    response += `   • Recommended Dosage: ${supp.dosage}\n`;
    response += `   • Reason: ${supp.reason}\n`;
    if (supp.estimated_cost) {
      response += `   • Estimated monthly cost: $${supp.estimated_cost}\n`;
    }
    if (supp.company_name) {
      response += `   • Recommended brand: ${supp.company_name}\n`;
    }
    response += '\n';
  });

  response += "\nWould you like me to explain more about any of these supplements or help you understand how they work together for your health goals?";
  return response;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();
    console.log('Received request with query:', query, 'userId:', userId);

    if (!userId) {
      throw new Error('User ID is required');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if user is asking about their supplement plan
    const planKeywords = [
      'my plan', 
      'my supplement', 
      'my recommendations', 
      'what supplements', 
      'view my', 
      'show me my',
      'supplements do i need',
      'supplement plan',
      'what should i take'
    ];
    
    const isAskingAboutPlan = planKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );

    if (isAskingAboutPlan) {
      console.log('User is asking about their supplement plan');
      const supplements = await getUserSupplements(supabaseClient, userId);
      const planResponse = await formatSupplementPlan(supplements);
      
      // Store the interaction in chat history
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
            message: planResponse,
            role: 'assistant'
          }
        ]);
      
      return new Response(
        JSON.stringify({ 
          choices: [{ 
            message: { 
              content: planResponse 
            } 
          }] 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For other queries, proceed with Perplexity API
    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) throw new Error('PERPLEXITY_API_KEY is not set');

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
    
    return new Response(
      JSON.stringify(data),
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