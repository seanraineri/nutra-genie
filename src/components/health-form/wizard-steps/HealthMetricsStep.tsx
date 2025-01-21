import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { BasicMetricsInputs } from "../metrics/BasicMetricsInputs";
import { ActivityLevelSelect } from "../metrics/ActivityLevelSelect";

interface HealthMetricsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const HealthMetricsStep = ({ form }: HealthMetricsStepProps) => {
  return (
    <div className="space-y-6">
      <BasicMetricsInputs form={form} />
      <ActivityLevelSelect 
        value={form.getValues("activityLevel")} 
        onValueChange={(value) => form.setValue("activityLevel", value)} 
      />
    </div>
  );
};