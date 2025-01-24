import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HealthFormData } from "@/types/health-form";
import { useFormContext } from "react-hook-form";

interface HealthGoalsInputProps {
  formData: HealthFormData;
  onChange: (goals: string[]) => void;
}

export const HealthGoalsInput = ({ formData, onChange }: HealthGoalsInputProps) => {
  const form = useFormContext();
  
  return (
    <FormField
      name="healthGoals"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Health Goals</FormLabel>
          <Textarea
            placeholder="Enter your health goals..."
            className="min-h-[100px]"
            value={Array.isArray(field.value) ? field.value.join(", ") : ""}
            onChange={(e) => {
              const goalsArray = e.target.value
                .split(",")
                .map(goal => goal.trim())
                .filter(goal => goal.length > 0);
              onChange(goalsArray);
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};