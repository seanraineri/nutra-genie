import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";
import { addHealthGoal } from "@/api/healthGoalsApi";
import { Session } from "@supabase/supabase-js";

export const useHealthFormSubmit = () => {
  const handleSubmit = async (formData: HealthFormData, session: Session | null) => {
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
  };

  return { handleSubmit };
};