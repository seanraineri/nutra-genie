import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";

export const submitHealthFormData = async (formData: HealthFormData) => {
  try {
    console.log('Starting form submission with data:', formData);

    // Convert strings to arrays by splitting on commas and trimming whitespace
    const convertToArray = (str: string) => 
      str.trim() ? str.split(',').map(item => item.trim()) : [];

    // First check if email already exists
    const { data: existingProfile } = await supabase
      .from('pending_health_profiles')
      .select('id')
      .eq('email', formData.email)
      .single();

    if (existingProfile) {
      throw new Error('An account with this email already exists');
    }

    // Insert new profile
    const { data, error } = await supabase
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
          medical_conditions: convertToArray(formData.medicalConditions),
          allergies: convertToArray(formData.allergies),
          current_medications: convertToArray(formData.currentMedications),
          health_goals: formData.healthGoals,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Failed to create profile');
    }

    console.log('Successfully created profile:', data.id);
    return data;

  } catch (error: any) {
    console.error('Submission error:', error);
    throw error;
  }
};