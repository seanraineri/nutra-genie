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
import { AllergiesStep } from "./wizard-steps/AllergiesStep";
import { MedicalConditionsStep } from "./wizard-steps/MedicalConditionsStep";
import { MedicationsStep } from "./wizard-steps/MedicationsStep";
import { DietStep } from "./wizard-steps/DietStep";
import { LifestyleStep } from "./wizard-steps/LifestyleStep";
import { TestResultsStep } from "./wizard-steps/TestResultsStep";
import { BudgetStep } from "./wizard-steps/BudgetStep";
import { FinalStep } from "./wizard-steps/FinalStep";

const steps = [
  "Personal Information",
  "Health Metrics",
  "Activity Level",
  "Health Goals",
  "Allergies",
  "Medical Conditions",
  "Medications",
  "Diet",
  "Lifestyle",
  "Test Results",
  "Monthly Budget",
  "Review & Submit",
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
      dietType: "healthy_balanced",
      sleepHours: "",
      smokingStatus: "non_smoker",
      alcoholConsumption: "none",
    },
  });

  const onSubmit = async (data: HealthFormSchemaType) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await submitHealthFormData(data);

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

  const getFieldsForStep = (step: number): Array<keyof HealthFormSchemaType> => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email", "phoneNumber", "password"];
      case 1:
        return ["age", "gender", "height", "weight"];
      case 2:
        return ["activityLevel"];
      case 3:
        return ["healthGoals"];
      case 4:
        return ["allergies"];
      case 5:
        return ["medicalConditions"];
      case 6:
        return ["currentMedications"];
      case 7:
        return ["dietType"];
      case 8:
        return ["sleepHours", "smokingStatus", "alcoholConsumption"];
      case 9:
        return ["hasBloodwork", "hasGeneticTesting"];
      case 10:
        return ["monthlyBudget"];
      default:
        return [];
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
        return <AllergiesStep form={form} />;
      case 5:
        return <MedicalConditionsStep form={form} />;
      case 6:
        return <MedicationsStep form={form} />;
      case 7:
        return <DietStep form={form} />;
      case 8:
        return <LifestyleStep form={form} />;
      case 9:
        return <TestResultsStep form={form} />;
      case 10:
        return <BudgetStep form={form} />;
      case 11:
        return <FinalStep formData={formData} form={form} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/10 to-teal-900/10 backdrop-blur-sm py-8">
      <Card className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 backdrop-blur-sm border border-cyan-200/20 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent animate-text-shimmer">
            {steps[currentStep]}
          </h2>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index <= currentStep 
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 animate-pulse" 
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              {renderStep()}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 border-cyan-200/20 w-[120px] justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => {
                    const fields = getFieldsForStep(currentStep);
                    form.trigger(fields).then((isValid) => {
                      if (isValid) {
                        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
                      }
                    });
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 transition-colors w-[120px] justify-center"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 transition-colors w-[180px] justify-center h-10"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Continue to Payment
                      <ArrowRight className="h-4 w-4" />
                    </div>
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
