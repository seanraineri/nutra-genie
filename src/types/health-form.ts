export type ActivityLevel = "sedentary" | "moderate" | "active" | "athlete";

export interface HealthFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  height: string;
  weight: string;
  activityLevel: ActivityLevel;
  medicalConditions: string;
  currentMedications: string;
  hasBloodwork: boolean;
  hasGeneticTesting: boolean;
  healthGoals: string;
}