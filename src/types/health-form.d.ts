
export interface HealthFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  age: string;
  gender: Gender;
  height: string;
  weight: string;
  activityLevel: ActivityLevel;
  sleepQuality: string;
  stressLevel: string;
  dietType: DietType[];
  medicalConditions: MedicalCondition[];
  allergies: string[];
  currentMedications: string[];
  supplementPreferences: string[];
  hasBloodwork: boolean;
  hasGeneticTesting: boolean;
  healthGoals: string[];
  monthlyBudget: string;
  testInformation?: {
    results: Record<string, string>;
  };
}

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type DietType = 'healthy_balanced' | 'vegan_vegetarian' | 'animal_based' | 'keto' | 'processed_food' | 'fair_average';

export interface MedicalCondition {
  condition: string;
  specification?: string;
}
