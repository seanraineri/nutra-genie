import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { BasicMetricsInputs } from "./metrics/BasicMetricsInputs";
import { ActivityLevelSelect } from "./metrics/ActivityLevelSelect";
import { MedicalInfoInputs } from "./metrics/MedicalInfoInputs";

interface HealthMetricsInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onActivityLevelChange: (value: ActivityLevel) => void;
}

export const HealthMetricsInputs = ({ 
  formData, 
  onChange, 
  onActivityLevelChange 
}: HealthMetricsInputsProps) => {
  return (
    <div className="space-y-6">
      <BasicMetricsInputs formData={formData} onChange={onChange} />
      <ActivityLevelSelect 
        value={formData.activityLevel} 
        onValueChange={onActivityLevelChange} 
      />
      <MedicalInfoInputs formData={formData} onChange={onChange} />
    </div>
  );
};