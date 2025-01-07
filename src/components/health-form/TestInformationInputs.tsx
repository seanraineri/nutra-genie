import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HealthFormData } from "@/types/health-form";
import { ExternalLink } from "lucide-react";

interface TestInformationInputsProps {
  formData: HealthFormData;
  onTestChange: (field: "hasBloodwork" | "hasGeneticTesting", value: boolean) => void;
}

export const TestInformationInputs = ({ 
  formData, 
  onTestChange 
}: TestInformationInputsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Available Test Results</Label>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasBloodwork"
              checked={formData.hasBloodwork}
              onCheckedChange={(checked) => 
                onTestChange("hasBloodwork", checked as boolean)
              }
            />
            <label
              htmlFor="hasBloodwork"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have blood work results
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasGeneticTesting"
              checked={formData.hasGeneticTesting}
              onCheckedChange={(checked) => 
                onTestChange("hasGeneticTesting", checked as boolean)
              }
            />
            <label
              htmlFor="hasGeneticTesting"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have genetic testing results
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Don't have test results?</Label>
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