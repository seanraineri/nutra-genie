export type ActivityLevel = "sedentary" | "moderate" | "active" | "athlete";
export type Gender = "male" | "female" | "other" | "prefer-not-to-say";

export interface HealthFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  gender: Gender;
  height: string;
  weight: string;
  activityLevel: ActivityLevel;
  medicalConditions: string;
  allergies: string;
  currentMedications: string;
  hasBloodwork: boolean;
  hasGeneticTesting: boolean;
  healthGoals: string;
}