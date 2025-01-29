import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ExternalLink, Loader2, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
                Upload your blood test results
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
                  Choose File
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Genetic Test Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base">Genetic Test Results</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex h-5 w-5 items-center justify-center cursor-help">
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[280px] p-3 bg-white/95 backdrop-blur-sm border shadow-lg rounded-lg">
                  <p className="text-sm text-gray-700">
                    Already completed any DNA test? Download the raw file and upload it here. We can analyze it and find which supplements are best for you.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="genetic" className="text-sm text-muted-foreground">
                Upload your genetic test results
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
                  Choose File
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Compatible Providers Section */}
      <div className="pt-6 pb-2">
        <p className="text-sm text-muted-foreground text-center mb-4">Compatible with</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
          <img src="/lovable-uploads/03119af2-aa67-4d99-a2be-27cafcd9b180.png" alt="23andMe" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/923a937b-18b3-441a-97d7-2cec053e2ce7.png" alt="Ancestry" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/f449a758-e06b-436b-b983-f8760bff832e.png" alt="MyHeritage DNA" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/6b7ac4fe-e19b-4bc2-a906-0b9146f1c637.png" alt="Quest Diagnostics" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/15cb73cf-57ff-4716-a01d-e8548a470723.png" alt="Labcorp" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
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