
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ExternalLink, Loader2, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [uploading, setUploading] = useState({
    bloodwork: false,
    genetic: false
  });
  const [noTestsYet, setNoTestsYet] = useState(false);
  const [proceedWithoutTests, setProceedWithoutTests] = useState(false);
  const [biomarkerConcerns, setBiomarkerConcerns] = useState("");

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

      const response = await fetch('http://localhost:8000/api/upload-lab-results', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload file');

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
          <Label className="text-base font-bold">Blood Test Results</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="bloodwork" className="text-sm font-semibold text-muted-foreground">
                Upload your blood test results
              </Label>
              <input
                type="file"
                id="bloodwork"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "bloodwork")}
                disabled={uploading.bloodwork || noTestsYet || proceedWithoutTests}
              />
            </div>
            <Button
              variant="outline"
              className="w-full font-semibold"
              onClick={() => document.getElementById('bloodwork')?.click()}
              disabled={uploading.bloodwork || noTestsYet || proceedWithoutTests}
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
            <Label className="text-base font-bold">Genetic Test Results</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex h-5 w-5 items-center justify-center cursor-help">
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[280px] p-3 bg-white/95 backdrop-blur-sm border shadow-lg rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    Already completed any DNA test? Download the raw file and upload it here. We can analyze it and find which supplements are best for you.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="genetic" className="text-sm font-semibold text-muted-foreground">
                Upload your genetic test results
              </Label>
              <input
                type="file"
                id="genetic"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "genetic")}
                disabled={uploading.genetic || noTestsYet || proceedWithoutTests}
              />
            </div>
            <Button
              variant="outline"
              className="w-full font-semibold"
              onClick={() => document.getElementById('genetic')?.click()}
              disabled={uploading.genetic || noTestsYet || proceedWithoutTests}
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

      {/* Biomarker Concerns Section */}
      <div className="space-y-4 pt-6">
        <Label className="text-base font-bold">
          Describe any Biomarkers or Genetic Data you are concerned with specifically (Optional)
        </Label>
        <Textarea
          placeholder="E.g., Vitamin D levels, MTHFR gene mutation, cholesterol levels..."
          value={biomarkerConcerns}
          onChange={(e) => setBiomarkerConcerns(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Compatible Providers Section */}
      <div className="pt-8 pb-4">
        <p className="text-sm text-muted-foreground text-center mb-6 font-bold">Compatible with</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center px-4">
          <img src="/lovable-uploads/f306116a-14e2-4cde-9391-3837d0e33c33.png" alt="23andMe" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/fef01f2d-4c40-475e-9199-767409519525.png" alt="Ancestry" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/151ff454-649a-4fcb-8142-f989d5ebebde.png" alt="MyHeritage DNA" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/8b6280c2-d85c-4cbd-9e8a-d810abd1c513.png" alt="Quest Diagnostics" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          <img src="/lovable-uploads/b138a134-e9bc-41a7-bde1-534fa554868d.png" alt="Labcorp" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4 italic font-semibold">+ many more!</p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex flex-col space-y-4">
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
            <Label htmlFor="no-tests" className="text-sm font-semibold">
              I don't have any test results yet but am purchasing
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="proceed-without-tests"
              checked={proceedWithoutTests}
              onCheckedChange={(checked) => {
                setProceedWithoutTests(checked as boolean);
                if (checked) {
                  setNoTestsYet(false);
                  form.setValue("hasBloodwork", false);
                  form.setValue("hasGeneticTesting", false);
                }
              }}
            />
            <Label htmlFor="proceed-without-tests" className="text-sm font-semibold">
              Proceed without any test results
            </Label>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full font-semibold"
          onClick={() => navigate('/purchase-tests')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Purchase Tests from Our Partners
        </Button>
      </div>
    </div>
  );
};
