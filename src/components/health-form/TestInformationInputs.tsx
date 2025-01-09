import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HealthFormData } from "@/types/health-form";
import { ExternalLink, Upload, Loader2, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TestInformationInputsProps {
  formData: HealthFormData;
  onTestChange: (field: "hasBloodwork" | "hasGeneticTesting", value: boolean) => void;
}

export const TestInformationInputs = ({ 
  formData, 
  onTestChange 
}: TestInformationInputsProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState({
    bloodwork: false,
    genetic: false
  });
  const [noTestsYet, setNoTestsYet] = useState(false);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "bloodwork" | "genetic"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));
    console.log('Starting file upload:', { type, fileName: file.name });

    try {
      // Create FormData for the file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('tempUserId', crypto.randomUUID());

      console.log('Invoking process-lab-results function...');
      const { data, error } = await supabase.functions.invoke('process-lab-results', {
        body: formData,
      });

      console.log('Upload response:', { data, error });

      if (error) {
        throw error;
      }

      onTestChange(type === "bloodwork" ? "hasBloodwork" : "hasGeneticTesting", true);

      toast({
        title: "File uploaded successfully",
        description: `Your ${type === "bloodwork" ? "blood work" : "genetic testing"} results have been uploaded.`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Available Test Results</Label>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bloodwork" className="text-sm text-muted-foreground">
              Blood Work Results (PDF)
            </Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                disabled={uploading.bloodwork || noTestsYet}
                onClick={() => document.getElementById('bloodwork')?.click()}
              >
                {uploading.bloodwork ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading.bloodwork ? "Uploading..." : "Upload Blood Work"}
              </Button>
              <input
                type="file"
                id="bloodwork"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "bloodwork")}
              />
              {formData.hasBloodwork && (
                <span className="text-sm text-green-600">✓ Uploaded</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="genetic" className="text-sm text-muted-foreground">
                Genetic Testing Results (PDF)
              </Label>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex h-5 w-5 items-center justify-center cursor-help">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card border shadow-md">
                    <p className="text-sm text-card-foreground">
                      Helps understand your genetic profile to see how well your body processes nutrients
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                disabled={uploading.genetic || noTestsYet}
                onClick={() => document.getElementById('genetic')?.click()}
              >
                {uploading.genetic ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading.genetic ? "Uploading..." : "Upload Genetic Results"}
              </Button>
              <input
                type="file"
                id="genetic"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "genetic")}
              />
              {formData.hasGeneticTesting && (
                <span className="text-sm text-green-600">✓ Uploaded</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="no-tests"
            checked={noTestsYet}
            onCheckedChange={(checked) => {
              setNoTestsYet(checked as boolean);
              if (checked) {
                onTestChange("hasBloodwork", false);
                onTestChange("hasGeneticTesting", false);
              }
            }}
          />
          <Label htmlFor="no-tests" className="text-sm font-medium">
            I don't have any test results yet
          </Label>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => window.open("/purchase-tests", "_blank")}
        >
          Purchase Tests <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};