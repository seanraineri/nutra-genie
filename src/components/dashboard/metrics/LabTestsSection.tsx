import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const LabTestsSection = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('health_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Store file metadata
      const { error: dbError } = await supabase
        .from('health_files')
        .insert({
          filename: file.name,
          file_path: filePath,
          file_type: file.type,
        });

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: "Analyzing your lab results...",
      });

      // Analyze the uploaded file
      setIsAnalyzing(true);
      const { data: analysisData, error: analysisError } = await supabase.functions
        .invoke('analyze-lab-report', {
          body: { filePath }
        });

      if (analysisError) throw analysisError;

      toast({
        title: "Analysis complete",
        description: "Your lab results have been processed successfully.",
      });

      console.log('Analysis results:', analysisData);

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process your lab results",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  const handlePurchase = () => {
    toast({
      title: "Redirecting to lab test purchase",
      description: "You'll be redirected to our partner's website to purchase your lab test.",
    });
  };

  return (
    <div className="mt-6 p-6 border-2 border-dashed rounded-lg bg-muted/50">
      <h3 className="text-lg font-semibold mb-4">Lab Tests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
          <Upload className="h-8 w-8 mb-2 text-primary" />
          <h4 className="font-medium mb-2">Upload Your Lab Tests</h4>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Drop your lab test results here or click to upload
          </p>
          <label className="w-full">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.csv,.txt"
              onChange={handleFileUpload}
              disabled={isUploading || isAnalyzing}
            />
            <Button variant="outline" className="w-full" disabled={isUploading || isAnalyzing}>
              {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Choose File"}
            </Button>
          </label>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
          <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
          <h4 className="font-medium mb-2">Purchase a Lab Test</h4>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Get comprehensive lab testing through our trusted partners
          </p>
          <Button onClick={handlePurchase} className="w-full">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};