import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      throw new Error('No file uploaded')
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the current user
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader)
    if (userError || !user) {
      throw new Error('Error getting user')
    }

    // Process the PDF file
    // Here we would typically use a service like AWS Textract or Google Cloud Vision
    // For now, we'll simulate processing with some example categories
    const testResults = [
      {
        test_name: "LDL Cholesterol",
        value: 130,
        unit: "mg/dL",
        reference_range_min: 0,
        reference_range_max: 100,
      },
      {
        test_name: "Vitamin D",
        value: 25,
        unit: "ng/mL",
        reference_range_min: 30,
        reference_range_max: 100,
      },
      // Add more test results as needed
    ]

    // Store the results in the lab_results table
    const { error: insertError } = await supabase
      .from('lab_results')
      .insert(testResults.map(result => ({
        user_id: user.id,
        ...result,
        test_date: new Date().toISOString(),
      })))

    if (insertError) {
      throw insertError
    }

    // Trigger the analyze-health-data function to update supplement recommendations
    const { error: analysisError } = await supabase.functions.invoke('analyze-health-data', {
      body: { userId: user.id }
    })

    if (analysisError) {
      throw analysisError
    }

    return new Response(
      JSON.stringify({ 
        message: 'Lab results processed successfully',
        results: testResults 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error processing lab results:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})