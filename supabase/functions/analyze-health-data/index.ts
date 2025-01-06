import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId } = await req.json();

    // Fetch user's health profile and lab results
    const { data: healthProfile } = await supabase
      .from('user_health_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: labResults } = await supabase
      .from('lab_results')
      .select('*')
      .eq('user_id', userId);

    if (!healthProfile || !labResults) {
      throw new Error('Health profile or lab results not found');
    }

    // Prepare the prompt for OpenAI
    const prompt = `As a healthcare professional, analyze the following health data and recommend supplements. Consider the patient's conditions and current medications for potential interactions.

Health Profile:
- Age: ${healthProfile.age}
- Gender: ${healthProfile.gender}
- Height: ${healthProfile.height}
- Weight: ${healthProfile.weight}
- Medical Conditions: ${healthProfile.medical_conditions?.join(', ')}
- Current Medications: ${healthProfile.current_medications?.join(', ')}

Lab Results:
${labResults.map(result => `- ${result.test_name}: ${result.value} ${result.unit} (Reference Range: ${result.reference_range_min}-${result.reference_range_max})`).join('\n')}

Please provide supplement recommendations in the following format for each recommendation:
1. Supplement name
2. Recommended dosage
3. Reason for recommendation
4. Priority level (1-5, where 1 is highest priority)
5. Estimated monthly cost
6. Any potential interactions with current medications
7. Any relevant precautions`;

    // Get recommendations from OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable healthcare professional specializing in supplement recommendations based on lab results and health metrics.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error('Failed to get recommendations from OpenAI');
    }

    const aiResponse = await openAIResponse.json();
    const recommendations = aiResponse.choices[0].message.content;

    // Parse and store recommendations
    const recommendationLines = recommendations.split('\n');
    const parsedRecommendations = [];
    let currentRec = {};

    for (const line of recommendationLines) {
      if (line.startsWith('1. ')) currentRec.supplement_name = line.substring(3);
      if (line.startsWith('2. ')) currentRec.dosage = line.substring(3);
      if (line.startsWith('3. ')) currentRec.reason = line.substring(3);
      if (line.startsWith('4. ')) {
        currentRec.priority = parseInt(line.substring(3));
        // When we hit priority, we've got all the main fields we need
        if (Object.keys(currentRec).length >= 4) {
          parsedRecommendations.push({
            ...currentRec,
            user_id: userId,
          });
          currentRec = {};
        }
      }
    }

    // Store recommendations in the database
    if (parsedRecommendations.length > 0) {
      const { error: deleteError } = await supabase
        .from('supplement_recommendations')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      const { error: insertError } = await supabase
        .from('supplement_recommendations')
        .insert(parsedRecommendations);

      if (insertError) throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, recommendations: parsedRecommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-health-data function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});