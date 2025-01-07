import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HealthFormData } from "@/types/health-form";

interface HealthGoalsInputProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const HealthGoalsInput = ({ formData, onChange }: HealthGoalsInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="healthGoals">Health Goals</Label>
      <Textarea
        id="healthGoals"
        value={formData.healthGoals}
        onChange={onChange}
        className="min-h-[100px]"
        placeholder="What are your main health and wellness goals? (e.g., weight management, muscle gain, better sleep, etc.)"
      />
    </div>
  );
};