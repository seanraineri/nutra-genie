import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { HealthFormData } from "@/types/health-form";
import { HealthGoalsInput } from "../HealthGoalsInput";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  formData: HealthFormData;
  isSubmitting: boolean;
}

export const FinalStep = ({ form, formData, isSubmitting }: FinalStepProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <HealthGoalsInput 
        formData={formData}
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

      <div className="flex flex-col space-y-4">
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

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate('/family-plan')}
        >
          <Users className="h-4 w-4" />
          Want to help your family too?
        </Button>
      </div>
    </div>
  );
};