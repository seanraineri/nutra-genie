export type ActivityLevel = "sedentary" | "moderate" | "active" | "athlete";
export type Gender = "male" | "female";

export interface MedicalCondition {
  condition: string;
  specification?: string;
}

export interface HealthFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  age: string;
  gender: Gender;
  height: string;
  weight: string;
  activityLevel: ActivityLevel;
  medicalConditions: MedicalCondition[];
  allergies: string[];
  currentMedications: string[];
  hasBloodwork: boolean;
  hasGeneticTesting: boolean;
  healthGoals: string[];
  otherHealthGoals?: string[];
  monthlyBudget: string;
}