import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
        <FormItem className="space-y-3">
          <FormLabel>What is your activity level?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              {activityLevels.map((level) => (
                <div
                  key={level.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem value={level.value} id={level.value} />
                  <Label
                    htmlFor={level.value}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">{level.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {level.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};