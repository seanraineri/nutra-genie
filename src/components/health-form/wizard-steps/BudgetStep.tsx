import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

interface BudgetStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const BudgetStep = ({ form }: BudgetStepProps) => {
  const budgetOptions = [
    { value: "50", label: "Less than $50/month" },
    { value: "100", label: "Less than $100/month" },
    { value: "150", label: "Less than $150/month" },
    { value: "200", label: "Less than $200/month" },
    { value: "999999", label: "Unlimited" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Monthly Supplement Budget</h3>
          <p className="text-sm text-muted-foreground">
            Select your preferred monthly budget for supplements. This helps us provide recommendations within your budget.
          </p>
        </div>

        <FormField
          control={form.control}
          name="monthlyBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Budget</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Select your monthly budget" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-transparent backdrop-blur-md">
                  {budgetOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a budget that works for you. You can always adjust this later.
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};