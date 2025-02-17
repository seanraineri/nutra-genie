
import { z } from "zod";

export const healthFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),

  // Health Metrics
  activityLevel: z.enum(["sedentary", "moderate", "active", "athlete"]),
  sleepQuality: z.enum(["poor", "fair", "good", "excellent"]).optional(),
  stressLevel: z.enum(["low", "moderate", "high"]).optional(),
  dietType: z.array(z.string()).optional(),
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  supplements: z.array(z.string()).optional(),
  familyHistory: z.array(z.string()).optional(),

  // Lifestyle
  alcoholConsumption: z.enum(["none", "occasional", "moderate", "frequent"]).optional(),
  smoker: z.boolean().optional(),
  exercise: z.array(z.string()).optional(),

  // Goals and Preferences
  healthGoals: z.array(z.string()).optional(),
  otherHealthGoals: z.array(z.string()).optional(),
  budget: z.enum(["low", "moderate", "high"]).optional(),
  
  // Test Results
  labResults: z.array(z.any()).optional(),
  testInformation: z.object({
    testType: z.string().optional(),
    testDate: z.string().optional(),
    labName: z.string().optional(),
    results: z.any().optional(),
  }).optional(),
});

export type HealthFormData = z.infer<typeof healthFormSchema>;
