import { HealthFormData, ActivityLevel, Gender } from "@/types/health-form";
import { BasicMetricsInputs } from "./metrics/BasicMetricsInputs";
import { ActivityLevelSelect } from "./metrics/ActivityLevelSelect";
import { MedicalInfoInputs } from "./metrics/MedicalInfoInputs";
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";

interface HealthMetricsInputsProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const HealthMetricsInputs = ({ form }: HealthMetricsInputsProps) => {
  return (
    <div className="space-y-6">
      <BasicMetricsInputs form={form} />
      <ActivityLevelSelect 
        value={form.getValues("activityLevel")} 
        onValueChange={(value) => form.setValue("activityLevel", value)} 
      />
      <MedicalInfoInputs form={form} />
    </div>
  );
};