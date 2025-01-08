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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      throw new Error('No file uploaded')
    }

    // Initialize AWS Textract client
    const textract = new TextractClient({
      region: "us-east-1", // Change to your preferred region
      credentials: {
        accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') || ''
      }
    });

    // Convert file to buffer for Textract
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Create Textract analyze document command
    const command = new AnalyzeDocumentCommand({
      Document: {
        Bytes: buffer
      },
      FeatureTypes: ["TABLES", "FORMS"]
    });

    console.log('Analyzing document with Textract...');
    const response = await textract.send(command);
    console.log('Textract response:', response);

    // Process Textract response to extract lab results
    const blocks = response.Blocks || [];
    const labResults = [];

    // Extract key-value pairs from forms
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.BlockType === "KEY_VALUE_SET" && block.EntityTypes?.includes("KEY")) {
        const key = block.Text;
        // Find corresponding value block
        const valueBlock = blocks.find(b => 
          b.BlockType === "KEY_VALUE_SET" && 
          b.EntityTypes?.includes("VALUE") &&
          b.Id === block.Relationships?.[0]?.Ids?.[0]
        );
        
        if (valueBlock?.Text) {
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

    // Get the current user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader);
    if (userError || !user) {
      throw new Error('Error getting user');
    }

    // Store the lab results
    const { error: insertError } = await supabase
      .from('lab_results')
      .insert(labResults.map(result => ({
        user_id: user.id,
        ...result,
        test_date: new Date().toISOString()
      })));

    if (insertError) {
      throw new Error('Failed to save lab results: ' + insertError.message);
    }

    // Store the original PDF
    const fileExt = file.name.split('.').pop();
    const filePath = `lab_results/${user.id}/${new Date().getTime()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('health_files')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Failed to upload PDF: ' + uploadError.message);
    }

    // Trigger health data analysis
    await supabase.functions.invoke('analyze-health-data', {
      body: { userId: user.id }
    });

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
    console.error('Error processing lab results:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
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