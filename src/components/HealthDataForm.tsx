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
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { FormSection } from "./health-form/FormSection";
import { HealthFormData } from "@/types/health-form";
import { useToast } from "@/hooks/use-toast";
import { submitHealthFormData } from "@/utils/healthFormSubmission";
import { healthFormSchema } from "@/schemas/healthFormSchema";
import type { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const HealthDataForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HealthFormSchemaType>({
    resolver: zodResolver(healthFormSchema),
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

    if (isSubmitting) {
      return; // Prevent double submission
    }

    try {
      setIsSubmitting(true);
      console.log('Starting form submission...');
      
      const result = await submitHealthFormData(data as HealthFormData);
      console.log('Form submission successful:', result);

      toast({
        title: "Success!",
        description: "Please complete the payment to create your account.",
      });

      // Small delay to ensure toast is visible
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use encodeURIComponent to properly encode the email for the URL
      const encodedEmail = encodeURIComponent(data.email);
      
      // Navigate with replace to prevent back navigation
      navigate(`/payment?email=${encodedEmail}`, { replace: true });
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Error",
        description: error.message || "An error occurred while submitting the form. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormSection
            title="Create Your Account"
            description="Enter your information to get personalized health recommendations"
          >
            <PersonalInfoInputs form={form} />
          </FormSection>

          <FormSection
            title="Health Metrics"
            description="Help us understand your current health status"
          >
            <HealthMetricsInputs form={form} />
          </FormSection>

          <FormSection
            title="Test Results"
            description="Upload any recent test results for better recommendations"
          >
            <TestInformationInputs 
              formData={form.getValues() as HealthFormData}
              onTestChange={(field, value) => form.setValue(field, value)}
            />
          </FormSection>

          <FormSection
            title="Health Goals"
            description="Tell us what you'd like to achieve. Be as specific as possible"
          >
            <HealthGoalsInput 
              formData={form.getValues() as HealthFormData}
              onChange={(e) => form.setValue("healthGoals", e.target.value)}
            />
          </FormSection>

          <FormSection
            title="Monthly Budget"
            description="Set your monthly budget for supplements to get recommendations within your range"
          >
            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Budget (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Enter your monthly budget"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
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
            type="submit"
            className="w-full"
            disabled={isSubmitting || !acceptedTerms}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              "Continue to Payment"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};