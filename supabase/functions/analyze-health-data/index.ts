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
    const { userId } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }

    console.log('Analyzing health data for user:', userId);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch user's health profile and lab results
    const { data: healthProfile, error: profileError } = await supabase
      .from('user_health_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError || !healthProfile) {
      console.error('Error fetching health profile:', profileError);
      throw new Error('Health profile not found');
    }

    const { data: labResults, error: labError } = await supabase
      .from('lab_results')
      .select('*')
      .eq('user_id', userId);

    if (labError) {
      console.error('Error fetching lab results:', labError);
      throw new Error('Error fetching lab results');
    }

    console.log('Successfully fetched health data');

    const monthlyBudget = healthProfile.monthly_supplement_budget || 0;
    console.log('Monthly budget:', monthlyBudget);

    // Prepare the prompt for OpenAI with budget consideration
    const prompt = `As a healthcare professional, analyze the following health data and recommend supplements within a monthly budget of $${monthlyBudget}. Consider the patient's conditions, current medications for potential interactions, and prioritize the most important supplements if the budget is limited.

Health Profile:
- Age: ${healthProfile.age}
- Gender: ${healthProfile.gender}
- Height: ${healthProfile.height}
- Weight: ${healthProfile.weight}
- Medical Conditions: ${healthProfile.medical_conditions?.join(', ') || 'None'}
- Current Medications: ${healthProfile.current_medications?.join(', ') || 'None'}
- Monthly Budget: $${monthlyBudget}

Lab Results:
${labResults?.map(result => `- ${result.test_name}: ${result.value} ${result.unit} (Reference Range: ${result.reference_range_min}-${result.reference_range_max})`).join('\n') || 'No lab results available'}

Please provide supplement recommendations that fit within the monthly budget of $${monthlyBudget}. Format each recommendation as follows:
1. Supplement name
2. Recommended dosage
3. Reason for recommendation
4. Priority level (1-5, where 1 is highest priority)
5. Estimated monthly cost (must be specific and help stay within budget)
6. Any potential interactions with current medications
7. Any relevant precautions

Important: The total monthly cost of all recommended supplements MUST NOT exceed $${monthlyBudget}. If the budget is limited, prioritize the most essential supplements first.`;

    // Get recommendations from OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable healthcare professional specializing in supplement recommendations based on lab results, health metrics, and budget constraints. Always ensure recommendations stay within the specified budget.'
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
      console.error('OpenAI API error:', await openAIResponse.text());
      throw new Error('Failed to get recommendations from OpenAI');
    }

    const aiResponse = await openAIResponse.json();
    const recommendations = aiResponse.choices[0].message.content;

    console.log('Successfully generated recommendations');

    // Parse and store recommendations
    const recommendationLines = recommendations.split('\n');
    const parsedRecommendations = [];
    let currentRec = {};
    let totalMonthlyCost = 0;

    for (const line of recommendationLines) {
      if (line.startsWith('1. ')) currentRec.supplement_name = line.substring(3);
      if (line.startsWith('2. ')) currentRec.dosage = line.substring(3);
      if (line.startsWith('3. ')) currentRec.reason = line.substring(3);
      if (line.startsWith('4. ')) currentRec.priority = parseInt(line.substring(3));
      if (line.startsWith('5. ')) {
        const costMatch = line.match(/\$(\d+(\.\d{1,2})?)/);
        if (costMatch) {
          const cost = parseFloat(costMatch[1]);
          currentRec.estimated_cost = cost;
          totalMonthlyCost += cost;
        }
      }

      // When we have all the main fields, add to recommendations
      if (Object.keys(currentRec).length >= 5) {
        // Only add if we're still within budget
        if (totalMonthlyCost <= monthlyBudget) {
          parsedRecommendations.push({
            ...currentRec,
            user_id: userId,
          });
        }
        currentRec = {};
      }
    }

    console.log('Total monthly cost:', totalMonthlyCost);
    console.log('Monthly budget:', monthlyBudget);

    // Store recommendations in the database
    if (parsedRecommendations.length > 0) {
      const { error: deleteError } = await supabase
        .from('supplement_recommendations')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Error deleting old recommendations:', deleteError);
        throw deleteError;
      }

      const { error: insertError } = await supabase
        .from('supplement_recommendations')
        .insert(parsedRecommendations);

      if (insertError) {
        console.error('Error inserting new recommendations:', insertError);
        throw insertError;
      }
    }

    console.log('Successfully stored recommendations');

    return new Response(
      JSON.stringify({ 
        success: true, 
        recommendations: parsedRecommendations,
        totalMonthlyCost,
        withinBudget: totalMonthlyCost <= monthlyBudget 
      }),
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