import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DietStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const DietStep = ({ form }: DietStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">What is your current diet?</h3>
        <p className="text-sm text-muted-foreground">
          Select the option that best describes your eating habits
        </p>

        <RadioGroup
          defaultValue={form.getValues("dietType")}
          onValueChange={(value: any) => form.setValue("dietType", value)}
          className="grid gap-4"
        >
          {[
            { value: "vegan_vegetarian", label: "Vegan/Vegetarian" },
            { value: "animal_based", label: "Animal Based" },
            { value: "keto", label: "Keto" },
            { value: "processed_food", label: "Fast/Processed Food Often" },
            { value: "fair_average", label: "A fair average diet" },
            { value: "healthy_balanced", label: "Healthy, minimally processed with protein and fruits and vegetables often" },
          ].map((diet) => (
            <div key={diet.value} className="flex items-center space-x-2">
              <RadioGroupItem value={diet.value} id={diet.value} />
              <Label htmlFor={diet.value}>{diet.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};