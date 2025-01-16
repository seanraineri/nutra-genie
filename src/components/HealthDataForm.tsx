import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { BiomarkerInputs } from "./health-form/BiomarkerInputs";
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { FormSection } from "./health-form/FormSection";
import { HealthFormData } from "@/types/health-form";
import { useToast } from "@/hooks/use-toast";
import { submitHealthFormData } from "@/utils/healthFormSubmission";
import { healthFormSchema } from "@/schemas/healthFormSchema";
import type { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Loader2, CheckCircle2, Users } from "lucide-react";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HealthDataFormProps {
  isFamilyPlan?: boolean;
}

export const HealthDataForm = ({ isFamilyPlan = false }: HealthDataFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HealthFormSchemaType>({
    resolver: zodResolver(healthFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "male",
      height: "",
      weight: "",
      activityLevel: "sedentary",
      medicalConditions: "",
      allergies: "",
      currentMedications: "",
      hasBloodwork: false,
      hasGeneticTesting: false,
      healthGoals: "",
      monthlyBudget: "",
    },
  });

  const onSubmit = async (data: HealthFormSchemaType) => {
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await submitHealthFormData(data as HealthFormData);

      toast({
        title: "Success!",
        description: "Please complete the payment to create your account.",
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      const encodedEmail = encodeURIComponent(data.email);
      navigate(`/payment?email=${encodedEmail}`, { replace: true });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-secondary">
          {isFamilyPlan ? "Create Family Account" : "Create Your Account"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormSection
            title="Personal Information"
            description="Enter your basic information to get started"
          >
            <PersonalInfoInputs form={form} />
          </FormSection>

          <FormSection
            title="Health Metrics"
            description="Help us understand your current health status"
          >
            <TooltipProvider>
              <HealthMetricsInputs form={form} />
            </TooltipProvider>
          </FormSection>

          <FormSection
            title="Test Results"
            description="Upload any recent test results for better recommendations"
          >
            <TestInformationInputs 
              formData={form.getValues() as HealthFormData}
              onTestChange={(field, value) => form.setValue(field, value)}
            />
            <BiomarkerInputs 
              onChange={(biomarkers) => {
                console.log("Biomarkers updated:", biomarkers);
                // You can store this in form state if needed
              }}
            />
          </FormSection>

          <FormSection
            title="Health Goals"
            description="Tell us what you'd like to achieve"
          >
            <HealthGoalsInput 
              formData={form.getValues() as HealthFormData}
              onChange={(e) => form.setValue("healthGoals", e.target.value)}
            />
          </FormSection>

          <TooltipProvider>
            <FormSection
              title="Monthly Budget"
              description="Set your monthly supplement budget"
            >
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
            </FormSection>
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

            {!isFamilyPlan && (
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/family-plan')}
              >
                <Users className="h-4 w-4" />
                Want to help your family too?
              </Button>
            )}
          </div>

          <Button
            type="submit"
            className="w-full transition-all hover:shadow-lg disabled:opacity-50"
            disabled={isSubmitting || !acceptedTerms}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Continue to Payment
              </div>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};