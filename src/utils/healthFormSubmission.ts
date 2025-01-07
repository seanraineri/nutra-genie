import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";

export const submitHealthFormData = async (formData: HealthFormData) => {
  // First check if there's already a pending profile for this email
  const { data: existingProfile } = await supabase
    .from('pending_health_profiles')
    .select('id')
    .eq('email', formData.email)
    .single();

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from('pending_health_profiles')
      .update({
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
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Reset expiration to 24 hours from now
      })
      .eq('id', existingProfile.id);

    if (error) throw error;
  } else {
    // Create new pending profile
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
  }
};