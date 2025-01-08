import { z } from "zod";
import { ActivityLevel, Gender } from "@/types/health-form";

export const healthFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  age: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Age must be a number")
    .refine((val) => Number(val) >= 18 && Number(val) <= 120, "Age must be between 18 and 120"),
  gender: z.enum(["male", "female"] as const),
  height: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Height must be a number")
    .refine((val) => Number(val) > 0, "Height must be greater than 0"),
  weight: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Weight must be a number")
    .refine((val) => Number(val) > 0, "Weight must be greater than 0"),
  activityLevel: z.enum(["sedentary", "moderate", "active", "athlete"] as const),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  hasBloodwork: z.boolean(),
  hasGeneticTesting: z.boolean(),
  healthGoals: z.string().min(10, "Please provide more detail about your health goals"),
});

export type HealthFormSchemaType = z.infer<typeof healthFormSchema>;