import { supabase } from "@/integrations/supabase/client";
import { HealthFormData } from "@/types/health-form";

export const submitHealthFormData = async (formData: HealthFormData) => {
  try {
    console.log('Starting form submission with data:', formData);

    // First clean up expired profiles
    await supabase
      .from('pending_health_profiles')
      .delete()
      .lt('expires_at', new Date().toISOString());

    // Check for existing non-expired profile with this email
    const { data: existingProfiles, error: checkError } = await supabase
      .from('pending_health_profiles')
      .select('id')
      .eq('email', formData.email)
      .gt('expires_at', new Date().toISOString());

    if (checkError) {
      console.error('Error checking existing profiles:', checkError);
      throw new Error('Error checking existing profiles');
    }

    if (existingProfiles && existingProfiles.length > 0) {
      throw new Error('An account with this email already exists');
    }

    // Convert medical conditions array to string array for database storage
    const medicalConditionsArray = formData.medicalConditions.map(mc => 
      typeof mc === 'string' ? mc : mc.condition
    );

    // Insert new profile
    const { data, error } = await supabase
      .from('pending_health_profiles')
      .insert({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activity_level: formData.activityLevel,
        medical_conditions: medicalConditionsArray,
        allergies: formData.allergies,
        current_medications: formData.currentMedications,
        health_goals: Array.isArray(formData.healthGoals) ? formData.healthGoals.join(',') : formData.healthGoals,
        monthly_supplement_budget: formData.monthlyBudget ? parseFloat(formData.monthlyBudget) : 0,
        sleep_hours: formData.sleepHours ? parseFloat(formData.sleepHours) : null,
        smoking_status: formData.smokingStatus,
        alcohol_consumption: formData.alcoholConsumption,
      })
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