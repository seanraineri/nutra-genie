import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";

export const submitHealthFormData = async (formData: HealthFormData) => {
  const { error } = await supabase
    .from('pending_health_profiles')
    .insert([
      {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activity_level: formData.activityLevel,
        medical_conditions: formData.medicalConditions.split(',').map(c => c.trim()),
        allergies: formData.allergies.split(',').map(a => a.trim()),
        current_medications: formData.currentMedications.split(',').map(m => m.trim()),
        health_goals: formData.healthGoals,
      },
    ]);

  if (error) throw error;
};