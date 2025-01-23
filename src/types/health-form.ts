export type ActivityLevel = "sedentary" | "moderate" | "active" | "athlete";
export type Gender = "male" | "female";
export type DietType = 
  | "vegan_vegetarian"
  | "animal_based"
  | "keto"
  | "processed_food"
  | "fair_average"
  | "healthy_balanced";

export type SmokingStatus = "non_smoker" | "former_smoker" | "current_smoker" | "vaper";
export type AlcoholConsumption = "none" | "occasional" | "moderate" | "frequent";

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
  dietType?: DietType;
  sleepHours: string;
  smokingStatus: SmokingStatus;
  alcoholConsumption: AlcoholConsumption;
}