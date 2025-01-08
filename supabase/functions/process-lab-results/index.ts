import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { 
  TextractClient, 
  AnalyzeDocumentCommand 
} from "npm:@aws-sdk/client-textract"

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
    console.log('Starting process-lab-results function');
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

    // Initialize AWS Textract client with explicit region
    console.log('Initializing Textract client');
    const textract = new TextractClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') || ''
      }
    });

    // Log AWS credentials status (not the actual credentials)
    console.log('AWS Credentials:', {
      hasAccessKey: !!Deno.env.get('AWS_ACCESS_KEY_ID'),
      hasSecretKey: !!Deno.env.get('AWS_SECRET_ACCESS_KEY'),
      region: "us-east-1"
    });

    // Convert file to buffer for Textract
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log('File prepared for analysis, size:', buffer.length);

    // Create Textract analyze document command
    const command = new AnalyzeDocumentCommand({
      Document: {
        Bytes: buffer
      },
      FeatureTypes: ["TABLES", "FORMS"]
    });

    console.log('Sending document to Textract for analysis...');
    let response;
    try {
      response = await textract.send(command);
      console.log('Received response from Textract:', {
        blocksCount: response.Blocks?.length || 0
      });
    } catch (textractError) {
      console.error('Textract error:', textractError);
      throw new Error(`Textract analysis failed: ${textractError.message}`);
    }

    // Process Textract response to extract lab results
    const blocks = response.Blocks || [];
    console.log('Processing', blocks.length, 'blocks from Textract response');
    const labResults = [];

    // Extract key-value pairs from forms
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.BlockType === "KEY_VALUE_SET" && block.EntityTypes?.includes("KEY")) {
        console.log('Found key block:', block.Text);
        const key = block.Text;
        // Find corresponding value block
        const valueBlock = blocks.find(b => 
          b.BlockType === "KEY_VALUE_SET" && 
          b.EntityTypes?.includes("VALUE") &&
          b.Id === block.Relationships?.[0]?.Ids?.[0]
        );
        
        if (valueBlock?.Text) {
          console.log('Found value for key', key, ':', valueBlock.Text);
          // Try to parse numeric values and ranges
          const value = parseFloat(valueBlock.Text);
          if (!isNaN(value)) {
            labResults.push({
              test_name: key,
              value: value,
              unit: "to be determined", // Would need more sophisticated parsing
              reference_range_min: null,
              reference_range_max: null
            });
          }
        }
      }
    }

    console.log('Extracted lab results:', labResults);

    // Get the current user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      console.error('No authorization header found');
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader);
    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('Error getting user: ' + userError?.message);
    }

    console.log('User authenticated:', user.id);

    // Store the lab results
    if (labResults.length > 0) {
      console.log('Storing', labResults.length, 'lab results in database');
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
    } else {
      console.log('No lab results were extracted from the document');
    }

    console.log('Lab results stored in database');

    // Store the original PDF
    const fileExt = 'pdf'; // Since we only accept PDFs
    const filePath = `lab_results/${user.id}/${new Date().getTime()}.${fileExt}`;

    console.log('Uploading PDF to storage:', filePath);
    const { error: uploadError } = await supabase.storage
      .from('health_files')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading PDF:', uploadError);
      throw new Error('Failed to upload PDF: ' + uploadError.message);
    }

    console.log('PDF file stored in storage');

    // Trigger health data analysis
    console.log('Triggering health data analysis');
    await supabase.functions.invoke('analyze-health-data', {
      body: { userId: user.id }
    });

    console.log('Health data analysis triggered');

    return new Response(
      JSON.stringify({ 
        message: 'Lab results processed successfully',
        results: labResults,
        filePath 
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
        details: error.toString(),
        stack: error.stack
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});