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

interface HealthGoalsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const HealthGoalsStep = ({ form }: HealthGoalsStepProps) => {
  const healthGoalOptions = [
    {
      value: "weight_management",
      label: "Weight Management",
      description: "Support healthy weight goals",
    },
    {
      value: "energy_focus",
      label: "Energy & Focus",
      description: "Improve daily energy levels and mental clarity",
    },
    {
      value: "immune_support",
      label: "Immune Support",
      description: "Strengthen immune system function",
    },
    {
      value: "sleep_stress",
      label: "Sleep & Stress",
      description: "Better sleep quality and stress management",
    },
    {
      value: "fitness_performance",
      label: "Fitness Performance",
      description: "Enhance workout results and recovery",
    },
  ];

  return (
    <FormField
      control={form.control}
      name="healthGoals"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>What is your primary health goal?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
            >
              {healthGoalOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {option.description}
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