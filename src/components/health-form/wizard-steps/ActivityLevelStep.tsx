import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BubbleOption } from "../BubbleOption";

interface ActivityLevelStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const ActivityLevelStep = ({ form }: ActivityLevelStepProps) => {
  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little to no regular exercise",
    },
    {
      value: "moderate",
      label: "Moderately Active",
      description: "Light exercise 1-3 times per week",
    },
    {
      value: "active",
      label: "Active",
      description: "Moderate exercise 3-5 times per week",
    },
    {
      value: "athlete",
      label: "Very Active",
      description: "Intense exercise 6-7 times per week",
    },
  ];

  return (
    <FormField
      control={form.control}
      name="activityLevel"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>What is your activity level?</FormLabel>
          <div className="grid gap-4">
            {activityLevels.map((level) => (
              <BubbleOption
                key={level.value}
                label={level.label}
                description={level.description}
                isSelected={field.value === level.value}
                onClick={() => field.onChange(level.value)}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};