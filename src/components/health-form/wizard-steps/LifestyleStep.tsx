import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { HealthFormSchemaType } from "@/schemas/healthFormSchema";

interface LifestyleStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const LifestyleStep = ({ form }: LifestyleStepProps) => {
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="smokingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Smoking/Vaping Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your smoking/vaping status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="non_smoker">Non-smoker</SelectItem>
                <SelectItem value="former_smoker">Former smoker</SelectItem>
                <SelectItem value="current_smoker">Current smoker</SelectItem>
                <SelectItem value="vaper">Vaper</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="alcoholConsumption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alcohol Consumption</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your alcohol consumption" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional (1-2 drinks/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3-7 drinks/week)</SelectItem>
                <SelectItem value="frequent">Frequent (8+ drinks/week)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};