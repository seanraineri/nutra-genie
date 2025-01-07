import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { useToast } from "@/components/ui/use-toast";

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
    height: "",
    weight: "",
    activityLevel: "sedentary",
    medicalConditions: "",
    currentMedications: "",
    hasBloodwork: false,
    hasGeneticTesting: false,
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
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (signUpError) throw signUpError;

      const { error: profileError } = await supabase
        .from('user_health_profiles')
        .insert([
          {
            age: parseInt(formData.age),
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            medical_conditions: formData.medicalConditions.split(',').map(c => c.trim()),
            current_medications: formData.currentMedications.split(',').map(m => m.trim()),
          },
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });

      navigate("/dashboard");
    } catch (error) {
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
        />
        
        <TestInformationInputs
          formData={formData}
          onTestChange={handleTestChange}
        />

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
          {loading ? "Creating Account..." : "Create Account & Continue"}
        </Button>
      </form>
    </Card>
  );
};