import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { TextractClient, AnalyzeDocumentCommand } from "npm:@aws-sdk/client-textract"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const uploadFile = async (supabase: any, file: File, userId: string) => {
  const fileExt = 'pdf';
  const filePath = `lab_results/${userId}/${new Date().getTime()}.${fileExt}`;
  
  console.log('Uploading PDF to storage:', filePath);
  const { error: uploadError } = await supabase.storage
    .from('health_files')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading PDF:', uploadError);
    throw new Error('Failed to upload PDF: ' + uploadError.message);
  }

  // Store file metadata
  const { error: dbError } = await supabase
    .from('health_files')
    .insert({
      user_id: userId,
      filename: file.name,
      file_path: filePath,
      file_type: file.type
    });

  if (dbError) {
    console.error('Error storing file metadata:', dbError);
    throw new Error('Failed to store file metadata: ' + dbError.message);
  }

  return filePath;
}

const processWithTextract = async (buffer: Uint8Array) => {
  const textract = new TextractClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') || '',
      secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') || ''
    }
  });

  const command = new AnalyzeDocumentCommand({
    Document: { Bytes: buffer },
    FeatureTypes: ["TABLES", "FORMS"]
  });

  try {
    const response = await textract.send(command);
    return response.Blocks || [];
  } catch (error) {
    console.error('Textract analysis failed:', error);
    throw new Error(`Textract analysis failed: ${error.message}`);
  }
}

const extractLabResults = (blocks: any[]) => {
  const results = [];
  
  for (const block of blocks) {
    if (block.BlockType === "KEY_VALUE_SET" && block.EntityTypes?.includes("KEY")) {
      const key = block.Text;
      const valueBlock = blocks.find(b => 
        b.BlockType === "KEY_VALUE_SET" && 
        b.EntityTypes?.includes("VALUE") &&
        b.Id === block.Relationships?.[0]?.Ids?.[0]
      );
      
      if (valueBlock?.Text) {
        const value = parseFloat(valueBlock.Text);
        if (!isNaN(value)) {
          results.push({
            test_name: key,
            value: value,
            unit: "to be determined",
            reference_range_min: null,
            reference_range_max: null
          });
        }
      }
    }
  }
  
  return results;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.error('No file found in request');
      throw new Error('No file uploaded');
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader);
    if (userError || !user) {
      throw new Error('Error getting user: ' + userError?.message);
    }

    // First, upload the file
    const filePath = await uploadFile(supabase, file, user.id);
    console.log('File uploaded successfully:', filePath);

    // Then process with Textract
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    console.log('Processing file with Textract...');
    const blocks = await processWithTextract(buffer);
    console.log('Textract processing complete, blocks:', blocks.length);

    // Extract and store lab results
    const labResults = extractLabResults(blocks);
    console.log('Extracted lab results:', labResults.length);

    if (labResults.length > 0) {
      const { error: insertError } = await supabase
        .from('lab_results')
        .insert(labResults.map(result => ({
          user_id: user.id,
          ...result,
          test_date: new Date().toISOString()
        })));

      if (insertError) {
        console.error('Error inserting lab results:', insertError);
        throw new Error('Failed to save lab results: ' + insertError.message);
      }
    }

    // Trigger health data analysis
    await supabase.functions.invoke('analyze-health-data', {
      body: { userId: user.id }
    });

    return new Response(
      JSON.stringify({ 
        message: 'File processed successfully',
        filePath,
        resultsCount: labResults.length
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