import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BubbleOption } from "../BubbleOption";
import type { HealthFormSchemaType } from "@/schemas/healthFormSchema";

interface LifestyleStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const LifestyleStep = ({ form }: LifestyleStepProps) => {
  const smokingOptions = [
    { value: "non_smoker", label: "Non-smoker" },
    { value: "former_smoker", label: "Former smoker" },
    { value: "current_smoker", label: "Current smoker" },
    { value: "vaper", label: "Vaper" },
  ];

  const alcoholOptions = [
    { value: "none", label: "None" },
    { value: "occasional", label: "Occasional (1-2 drinks/week)" },
    { value: "moderate", label: "Moderate (3-7 drinks/week)" },
    { value: "frequent", label: "Frequent (8+ drinks/week)" },
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="sleepHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Average Sleep (hours per night)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="Enter average sleep hours"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="smokingStatus"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>Smoking/Vaping Status</FormLabel>
            <div className="grid gap-4">
              {smokingOptions.map((option) => (
                <BubbleOption
                  key={option.value}
                  label={option.label}
                  isSelected={field.value === option.value}
                  onClick={() => field.onChange(option.value)}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="alcoholConsumption"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>Alcohol Consumption</FormLabel>
            <div className="grid gap-4">
              {alcoholOptions.map((option) => (
                <BubbleOption
                  key={option.value}
                  label={option.label}
                  isSelected={field.value === option.value}
                  onClick={() => field.onChange(option.value)}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};