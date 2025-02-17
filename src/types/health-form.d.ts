
export interface HealthFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  age: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  height: string;
  weight: string;
  activityLevel: "sedentary" | "moderate" | "active" | "athlete";
  sleepQuality?: "poor" | "fair" | "good" | "excellent";
  stressLevel?: "low" | "moderate" | "high";
  dietType?: string[];
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
  supplements?: string[];
  familyHistory?: string[];
  alcoholConsumption?: "none" | "occasional" | "moderate" | "frequent";
  smoker?: boolean;
  exercise?: string[];
  healthGoals?: string[];
  otherHealthGoals?: string[];
  budget?: "low" | "moderate" | "high";
  labResults?: any[];
  testInformation?: {
    testType?: string;
    testDate?: string;
    labName?: string;
    results?: any;
  };
}

export interface MedicalCondition {
  id: string;
  name: string;
  description?: string;
  category?: string;
}
