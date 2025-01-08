import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";

export const submitHealthFormData = async (formData: HealthFormData) => {
  try {
    console.log('Submitting form data:', formData);

    // Convert strings to arrays by splitting on commas and trimming whitespace
    const convertToArray = (str: string) => 
      str.trim() ? str.split(',').map(item => item.trim()) : [];

    const { data, error } = await supabase
      .from('pending_health_profiles')
      .insert([
        {
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          age: parseInt(formData.age) || null,
          gender: formData.gender,
          height: parseFloat(formData.height) || null,
          weight: parseFloat(formData.weight) || null,
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

    return data;
  } catch (error: any) {
    console.error('Submission error:', error);
    throw new Error(error.message || 'Failed to submit health form data');
  }
};