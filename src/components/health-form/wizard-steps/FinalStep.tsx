import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { HealthFormData } from "@/types/health-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FinalStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
  formData: HealthFormData;
  isSubmitting: boolean;
}

export const FinalStep = ({ form, formData, isSubmitting }: FinalStepProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            className="data-[state=checked]:bg-primary"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the{" "}
            <a href="/terms" className="text-primary hover:underline">
              terms and conditions
            </a>
          </label>
        </div>

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate('/family-plan')}
        >
          <Users className="h-4 w-4" />
          Want to help your family too?
        </Button>
      </div>
    </div>
  );
};