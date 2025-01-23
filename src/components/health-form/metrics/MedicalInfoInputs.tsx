import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface MedicalInfoInputsProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const MedicalInfoInputs = ({ form }: MedicalInfoInputsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Medical Conditions</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={field.value ? JSON.stringify(field.value) : ""}
                className="min-h-[100px] resize-y"
                placeholder="List any current medical conditions"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allergies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Allergies</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={field.value ? field.value.join(", ") : ""}
                className="min-h-[100px] resize-y"
                placeholder="List any allergies you have"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currentMedications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Medications</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="min-h-[100px] resize-y"
                placeholder="List any medications you're currently taking"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};