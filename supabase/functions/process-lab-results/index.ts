import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting file processing...');
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const tempUserId = formData.get('tempUserId') as string;

    if (!file) {
      console.error('No file found in request');
      throw new Error('No file uploaded');
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      uploadType: type,
      tempUserId
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Sanitize filename and generate unique path
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop();
    const uniqueId = crypto.randomUUID();
    const filePath = `temp/${tempUserId}/${type}/${uniqueId}.${fileExt}`;

    console.log('Uploading file to path:', filePath);

    // Upload file to storage
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('health_files')
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('Failed to upload file: ' + uploadError.message);
    }

    // Store file metadata
    const { error: dbError } = await supabase
      .from('health_files')
      .insert({
        filename: sanitizedFileName,
        file_path: filePath,
        file_type: file.type,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store file metadata: ' + dbError.message);
    }

    console.log('File processed successfully');

    return new Response(
      JSON.stringify({ 
        message: 'File processed successfully',
        filePath,
        type
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
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