import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const tempUserId = formData.get('tempUserId');

    if (!file) {
      console.error('No file found in request');
      throw new Error('No file uploaded');
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      tempUserId
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user ID either from auth token or use temporary ID
    let userId = tempUserId as string;
    
    // If there's an authorization header, try to get the user
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser(
          authHeader.replace('Bearer ', '')
        );
        if (user && !userError) {
          userId = user.id;
        }
      } catch (error) {
        console.error('Error getting user:', error);
        // Continue with tempUserId if auth fails
      }
    }

    // First, upload the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    console.log('Processing file...');

    // Store file metadata
    const { error: dbError } = await supabase
      .from('health_files')
      .insert({
        user_id: userId,
        filename: file.name,
        file_path: `temp/${userId}/${file.name}`,
        file_type: file.type
      });

    if (dbError) {
      console.error('Error storing file metadata:', dbError);
      throw new Error('Failed to store file metadata: ' + dbError.message);
    }

    return new Response(
      JSON.stringify({ 
        message: 'File processed successfully',
        userId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-lab-results:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});