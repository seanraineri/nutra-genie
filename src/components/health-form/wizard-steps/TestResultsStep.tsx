import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TestResultsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const TestResultsStep = ({ form }: TestResultsStepProps) => {
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

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('tempUserId', crypto.randomUUID());

      const { error } = await supabase.functions.invoke('process-lab-results', {
        body: formData,
      });

      if (error) throw error;

      form.setValue(type === "bloodwork" ? "hasBloodwork" : "hasGeneticTesting", true);

      toast({
        title: "File uploaded successfully",
        description: `Your ${type === "bloodwork" ? "blood work" : "genetic testing"} results have been uploaded.`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file.",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blood Test Upload Section */}
        <div className="space-y-4">
          <Label className="text-base">Blood Test Results</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="bloodwork" className="text-sm text-muted-foreground">
                Upload your blood test results (PDF)
              </Label>
              <input
                type="file"
                id="bloodwork"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "bloodwork")}
                disabled={uploading.bloodwork || noTestsYet}
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('bloodwork')?.click()}
              disabled={uploading.bloodwork || noTestsYet}
            >
              {uploading.bloodwork ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose PDF File
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Genetic Test Upload Section */}
        <div className="space-y-4">
          <Label className="text-base">Genetic Test Results</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="genetic" className="text-sm text-muted-foreground">
                Upload your genetic test results (PDF)
              </Label>
              <input
                type="file"
                id="genetic"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "genetic")}
                disabled={uploading.genetic || noTestsYet}
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('genetic')?.click()}
              disabled={uploading.genetic || noTestsYet}
            >
              {uploading.genetic ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose PDF File
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="no-tests"
            checked={noTestsYet}
            onCheckedChange={(checked) => {
              setNoTestsYet(checked as boolean);
              if (checked) {
                form.setValue("hasBloodwork", false);
                form.setValue("hasGeneticTesting", false);
              }
            }}
          />
          <Label htmlFor="no-tests" className="text-sm font-medium">
            I don't have any test results yet
          </Label>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open("/purchase-tests", "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Purchase Tests from Our Partners
        </Button>
      </div>
    </div>
  );
};