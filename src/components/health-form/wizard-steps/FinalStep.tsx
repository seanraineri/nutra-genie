import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { HealthGoalsInput } from "../HealthGoalsInput";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface FinalStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
  isSubmitting: boolean;
}

export const FinalStep = ({ form, isSubmitting }: FinalStepProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="space-y-6">
      <HealthGoalsInput 
        formData={form.getValues()}
        onChange={(e) => form.setValue("healthGoals", e.target.value)}
      />

      <TooltipProvider>
        <FormField
          control={form.control}
          name="monthlyBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Budget (USD)</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Enter your monthly budget"
                      className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set a realistic monthly budget for your supplements</p>
                </TooltipContent>
              </Tooltip>
              <FormMessage />
            </FormItem>
          )}
        />
      </TooltipProvider>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          className="data-[state=checked]:bg-primary"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I accept the{" "}
          <a href="/terms" className="text-primary hover:underline">
            terms and conditions
          </a>
        </label>
      </div>
    </div>
  );
};