import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { TestInformationInputs } from "../TestInformationInputs";
import { BiomarkerInputs } from "../BiomarkerInputs";
import { HealthFormData } from "@/types/health-form";

interface TestResultsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
  formData: HealthFormData;
}

export const TestResultsStep = ({ form, formData }: TestResultsStepProps) => {
  return (
    <div className="space-y-6">
      <TestInformationInputs 
        formData={formData}
        onTestChange={(field, value) => form.setValue(field, value)}
      />
      <BiomarkerInputs 
        onChange={(biomarkers) => {
          console.log("Biomarkers updated:", biomarkers);
        }}
      />
    </div>
  );
};