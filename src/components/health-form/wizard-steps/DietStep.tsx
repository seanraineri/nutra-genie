import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BubbleOption } from "../BubbleOption";

interface DietStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const DietStep = ({ form }: DietStepProps) => {
  const dietOptions = [
    { value: "vegan_vegetarian", label: "Vegan/Vegetarian" },
    { value: "animal_based", label: "Animal Based" },
    { value: "keto", label: "Keto" },
    { value: "processed_food", label: "Fast/Processed Food Often" },
    { value: "fair_average", label: "A fair average diet" },
    {
      value: "healthy_balanced",
      label: "Healthy, minimally processed with protein and fruits and vegetables often",
    },
  ];

  return (
    <FormField
      control={form.control}
      name="dietType"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>What is your current diet?</FormLabel>
          <div className="grid gap-4">
            {dietOptions.map((diet) => (
              <BubbleOption
                key={diet.value}
                label={diet.label}
                isSelected={field.value === diet.value}
                onClick={() => field.onChange(diet.value)}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};