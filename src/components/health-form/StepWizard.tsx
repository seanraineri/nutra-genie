import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { healthFormSchema } from "@/schemas/healthFormSchema";
import type { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { submitHealthFormData } from "@/utils/healthFormSubmission";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { PersonalInfoStep } from "./wizard-steps/PersonalInfoStep";
import { HealthMetricsStep } from "./wizard-steps/HealthMetricsStep";
import { ActivityLevelStep } from "./wizard-steps/ActivityLevelStep";
import { HealthGoalsStep } from "./wizard-steps/HealthGoalsStep";
import { TestResultsStep } from "./wizard-steps/TestResultsStep";
import { BudgetStep } from "./wizard-steps/BudgetStep";
import { FinalStep } from "./wizard-steps/FinalStep";
import { ProgressIndicator } from "./ProgressIndicator";
import type { HealthFormData } from "@/types/health-form";

const steps = [
  "Personal",
  "Metrics",
  "Activity",
  "Goals",
  "Tests",
  "Budget",
  "Review",
];

export const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<HealthFormSchemaType>({
    resolver: zodResolver(healthFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      age: "",
      gender: "male",
      height: "",
      weight: "",
      activityLevel: "sedentary",
      medicalConditions: [],
      allergies: [],
      currentMedications: [],
      hasBloodwork: false,
      hasGeneticTesting: false,
      healthGoals: [],
      otherHealthGoals: [],
      monthlyBudget: "",
      dietType: undefined,
      sleepHours: "",
      smokingStatus: "non_smoker",
      alcoholConsumption: "none",
    },
  });

  const onSubmit = async (data: HealthFormSchemaType) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const formData: HealthFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        activityLevel: data.activityLevel,
        medicalConditions: data.medicalConditions,
        allergies: data.allergies || [],
        currentMedications: data.currentMedications,
        hasBloodwork: data.hasBloodwork,
        hasGeneticTesting: data.hasGeneticTesting,
        healthGoals: data.healthGoals,
        otherHealthGoals: data.otherHealthGoals,
        monthlyBudget: data.monthlyBudget,
        dietType: data.dietType,
        sleepHours: data.sleepHours,
        smokingStatus: data.smokingStatus,
        alcoholConsumption: data.alcoholConsumption,
      };

      await submitHealthFormData(formData);

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

  const renderStep = () => {
    const formData = form.getValues();
    
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={form} />;
      case 1:
        return <HealthMetricsStep form={form} />;
      case 2:
        return <ActivityLevelStep form={form} />;
      case 3:
        return <HealthGoalsStep form={form} />;
      case 4:
        return <TestResultsStep form={form} />;
      case 5:
        return <BudgetStep form={form} />;
      case 6:
        return <FinalStep form={form} formData={formData} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  const handleNextStep = async () => {
    const currentFields = getCurrentStepFields();
    const isValid = await form.trigger(currentFields);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 0:
        return ["firstName", "lastName", "email", "phoneNumber", "password"];
      case 1:
        return ["age", "gender", "height", "weight"];
      case 2:
        return ["activityLevel"];
      case 3:
        return ["healthGoals"];
      case 4:
        return ["hasBloodwork", "hasGeneticTesting"];
      case 5:
        return ["monthlyBudget"];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ProgressIndicator steps={steps} currentStep={currentStep} />
      
      <Card className="onboarding-card w-full max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-secondary">
            {steps[currentStep]}
          </h2>
          <p className="text-muted-foreground">
            {currentStep === steps.length - 1
              ? "Review your information and submit"
              : "Tell us about yourself"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="min-h-[300px] transition-all duration-300 ease-in-out">
              {renderStep()}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className="onboarding-button-secondary transition-all duration-200 hover:-translate-x-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="onboarding-button-primary transition-all duration-200 hover:translate-x-1"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="onboarding-button-primary transition-all duration-200 hover:translate-x-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};