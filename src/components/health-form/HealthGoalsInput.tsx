import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HealthFormData } from "@/types/health-form";
import { useFormContext } from "react-hook-form";

interface HealthGoalsInputProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};