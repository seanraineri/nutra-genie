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
import { MedicalHistoryStep } from "./wizard-steps/MedicalHistoryStep";
import { TestResultsStep } from "./wizard-steps/TestResultsStep";
import { FinalStep } from "./wizard-steps/FinalStep";

const steps = [
  "Personal Information",
  "Health Metrics",
  "Medical History",
  "Test Results",
  "Goals & Terms",
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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await submitHealthFormData(data);

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

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (step: number): Array<keyof HealthFormSchemaType> => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email", "password"];
      case 1:
        return ["age", "gender", "height", "weight", "activityLevel"];
      case 2:
        return ["medicalConditions", "allergies", "currentMedications"];
      case 3:
        return ["hasBloodwork", "hasGeneticTesting"];
      case 4:
        return ["healthGoals", "monthlyBudget"];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={form} />;
      case 1:
        return <HealthMetricsStep form={form} />;
      case 2:
        return <MedicalHistoryStep form={form} />;
      case 3:
        return <TestResultsStep form={form} />;
      case 4:
        return <FinalStep form={form} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-secondary">
          {steps[currentStep]}
        </h2>
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};