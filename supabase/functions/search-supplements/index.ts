import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, chatHistory = [] } = await req.json();
    
    console.log('Processing request with:', { query, chatHistoryLength: chatHistory.length });

    // Validate inputs
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query parameter');
    }

    // Start with the system message
    const messages = [
      {
        role: "system",
        content: "You are a knowledgeable health assistant specializing in analyzing lab results, recommending supplements, and providing evidence-based health advice. Always be clear, concise, and focus on actionable recommendations."
      }
    ];

    // Add chat history ensuring alternating user/assistant messages
    let lastRole = "system";
    for (const msg of chatHistory) {
      // Skip if we would have two messages with the same role in sequence
      if (msg.role === lastRole) {
        console.log('Skipping message due to non-alternating roles:', msg);
        continue;
      }
      messages.push({
        role: msg.role,
        content: msg.content
      });
      lastRole = msg.role;
    }

    // Add the current query as a user message, but only if the last message wasn't a user message
    if (lastRole !== "user") {
      messages.push({
        role: "user",
        content: query
      });
    }

    console.log('Sending request to Perplexity API with messages structure:', {
      messageCount: messages.length,
      messages: messages.map(m => ({ role: m.role }))
    });

    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) {
      throw new Error('Perplexity API key not configured');
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Perplexity API:', {
      status: response.status,
      hasChoices: !!data.choices,
      firstChoice: data.choices?.[0]
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in search-supplements function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});