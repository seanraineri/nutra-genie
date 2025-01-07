import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { useToast } from "@/components/ui/use-toast";
import { useHealthFormSubmit } from "@/hooks/useHealthFormSubmit";
import { AuthSection } from "./health-form/AuthSection";
import { TermsSection } from "./health-form/TermsSection";
import { FormHeader } from "./health-form/FormHeader";

export const HealthDataForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [session, setSession] = useState(null);
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
    allergies: "",
    currentMedications: "",
    hasBloodwork: false,
    hasGeneticTesting: false,
    healthGoals: "",
  });

  const { handleSubmit: submitForm } = useHealthFormSubmit();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session.user.email || "",
          firstName: session.user.user_metadata.first_name || "",
          lastName: session.user.user_metadata.last_name || "",
        }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session.user.email || "",
          firstName: session.user.user_metadata.first_name || "",
          lastName: session.user.user_metadata.last_name || "",
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      await submitForm(formData, session);
      toast({
        title: "Profile Updated",
        description: "Your health profile has been created successfully.",
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
      <FormHeader isAuthenticated={!!session} />

      {!session && <AuthSection />}

      <form onSubmit={handleFormSubmit} className="space-y-8">
        {!session && (
          <PersonalInfoInputs formData={formData} onChange={handleInputChange} />
        )}
        
        <HealthMetricsInputs
          formData={formData}
          onChange={handleInputChange}
          onActivityLevelChange={handleActivityLevelChange}
        />
        
        <TestInformationInputs
          formData={formData}
          onTestChange={handleTestChange}
        />

        <HealthGoalsInput formData={formData} onChange={handleInputChange} />

        <TermsSection 
          acceptedTerms={acceptedTerms}
          onTermsChange={(checked) => setAcceptedTerms(checked)}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !acceptedTerms}
        >
          {loading ? "Saving..." : "Save Health Profile"}
        </Button>
      </form>
    </Card>
  );
};