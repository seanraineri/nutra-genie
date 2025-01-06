import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { filePath } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Download file content from storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('health_files')
      .download(filePath)

    if (downloadError) {
      console.error('Download error:', downloadError);
      throw new Error('Error downloading file: ' + downloadError.message)
    }

    // Convert file to text
    const text = await fileData.text()

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Analyze the content using GPT
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a medical lab report analyzer. Extract key health metrics and provide insights."
        },
        {
          role: "user",
          content: `Analyze this lab report and extract key metrics: ${text}`
        }
      ],
    })

    const analysis = completion.data.choices[0]?.message?.content

    // Store the analysis results without user_id
    const { error: insertError } = await supabase
      .from('lab_results')
      .insert({
        test_name: 'Lab Report Analysis',
        value: 0,
        unit: 'N/A',
      })

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error storing analysis: ' + insertError.message)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Analysis complete',
        analysis 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})