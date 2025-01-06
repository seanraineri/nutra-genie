import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')

serve(async (req) => {
  try {
    const { query } = await req.json()

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `You are a health assistant providing information about supplements. Keep your responses concise and well-formatted with:
- Brief overview (1-2 sentences)
- Key benefits (bullet points)
- Recommended dosage
- Any important precautions

Limit response to 150 words.`
          },
          {
            role: 'user',
            content: query
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Perplexity API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return new Response(
      JSON.stringify({ choices: data.choices }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})