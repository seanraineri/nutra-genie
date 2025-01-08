import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const LabTestsSection = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // First, upload the file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `lab_results/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('health_files')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error('Failed to upload file');
      }

      // Now call the process-lab-results function
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error('No authentication session found');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await supabase.functions.invoke('process-lab-results', {
        body: formData,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Lab results uploaded successfully",
        description: "Your results are being processed and will be available shortly.",
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your lab results.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePurchase = () => {
    toast({
      title: "Redirecting to lab test purchase",
      description: "You'll be redirected to our partner's website to purchase your lab test.",
    });
    window.open("/purchase-tests", "_blank");
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
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Choose PDF File
                </>
              )}
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