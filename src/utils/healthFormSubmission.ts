
import type { HealthFormData, MedicalCondition } from "@/types/health-form";

export const submitHealthFormData = async (data: HealthFormData) => {
  try {
    // Mock submission
    console.log('Mock submitting health form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error: any) {
    console.error("Error submitting health form data:", error);
    throw new Error(error.message || "Failed to submit health form data");
  }
};
