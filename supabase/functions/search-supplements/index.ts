import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    console.log('Processing supplement search query:', query)

    // For now, return a simplified, reliable response
    const response = {
      choices: [
        {
          message: {
            content: `Here's what I found about ${query}:

1. General Information:
   - ${query} is a commonly used dietary supplement
   - It's important to consult with a healthcare provider before starting any supplement

2. Common Uses:
   - Supports overall health and wellness
   - May help with specific health conditions (consult your doctor)

3. Safety Considerations:
   - Follow recommended dosage guidelines
   - Be aware of potential interactions with medications
   - Monitor for any adverse reactions

Would you like to know more about any specific aspect of ${query}?`
          }
        }
      ]
    }

    console.log('Sending response:', response)

    return new Response(
      JSON.stringify(response),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (error) {
    console.error('Error in search-supplements function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      }
    )
  }
})