import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { useToast } from "@/components/ui/use-toast";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

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

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Pre-fill email for authenticated users
        setFormData(prev => ({
          ...prev,
          email: session.user.email || "",
          firstName: session.user.user_metadata.first_name || "",
          lastName: session.user.user_metadata.last_name || "",
        }));
      }
    });

    // Listen for auth changes
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
      if (!session) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
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
        if (!authData.user) throw new Error("No user data returned");
      }

      const userId = session?.user.id || formData.email;

      const { error: profileError } = await supabase
        .from('user_health_profiles')
        .insert([
          {
            user_id: userId,
            age: parseInt(formData.age),
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            medical_conditions: formData.medicalConditions.split(',').map(c => c.trim()),
            allergies: formData.allergies.split(',').map(a => a.trim()),
            current_medications: formData.currentMedications.split(',').map(m => m.trim()),
          },
        ]);

      if (profileError) throw profileError;

      // Add health goals if provided
      if (formData.healthGoals.trim()) {
        const goals = formData.healthGoals
          .split('\n')
          .filter(goal => goal.trim())
          .map(goal => ({ 
            user_id: userId,
            goal_name: goal.trim() 
          }));

        for (const goal of goals) {
          await addHealthGoal(goal);
        }
      }

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
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-secondary">
          {session ? "Complete Your Health Profile" : "Create Your Account"}
        </h2>
        <p className="text-muted-foreground">
          {session 
            ? "Please provide your health information to get personalized recommendations"
            : "Enter your information to get started"
          }
        </p>
      </div>

      {!session && (
        <>
          <div className="mb-6">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              redirectTo={window.location.origin + '/input'}
              onlyThirdPartyProviders
            />
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
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
          {loading ? "Saving..." : "Save Health Profile"}
        </Button>
      </form>
    </Card>
  );
};