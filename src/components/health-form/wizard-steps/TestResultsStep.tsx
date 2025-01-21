import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { TestInformationInputs } from "../TestInformationInputs";
import { BiomarkerInputs } from "../BiomarkerInputs";

interface TestResultsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const TestResultsStep = ({ form }: TestResultsStepProps) => {
  return (
    <div className="space-y-6">
      <TestInformationInputs 
        formData={form.getValues()}
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