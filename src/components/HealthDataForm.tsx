import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { HealthFormData, ActivityLevel, Gender } from "@/types/health-form";
import { useToast } from "@/components/ui/use-toast";
import { submitHealthFormData } from "@/utils/healthFormSubmission";

export const HealthDataForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState<HealthFormData>({
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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGenderChange = (value: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleActivityLevelChange = (value: ActivityLevel) => {
    setFormData((prev) => ({
      ...prev,
      activityLevel: value,
    }));
  };

  const handleTestChange = (
    field: "hasBloodwork" | "hasGeneticTesting",
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await submitHealthFormData(formData);
      
      toast({
        title: "Form Submitted",
        description: "Please complete the payment to create your account.",
      });

      // Navigate to payment page with email as query param for identification
      navigate(`/payment?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-secondary">Create Your Account</h2>
          <p className="text-muted-foreground">
            Enter your information to get personalized health recommendations
          </p>
        </div>

        <PersonalInfoInputs formData={formData} onChange={handleInputChange} />
        
        <HealthMetricsInputs
          formData={formData}
          onChange={handleInputChange}
          onActivityLevelChange={handleActivityLevelChange}
          onGenderChange={handleGenderChange}
        />
        
        <TestInformationInputs
          formData={formData}
          onTestChange={handleTestChange}
        />

        <HealthGoalsInput formData={formData} onChange={handleInputChange} />

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
          disabled={loading || !acceptedTerms}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </Button>
      </form>
    </Card>
  );
};