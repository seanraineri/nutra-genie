
import type { HealthFormData } from "@/types/health-form";
import { client } from "@/integrations/supabase/client";

export const submitHealthFormData = async (data: HealthFormData) => {
  try {
    const response = await client.post('/api/health-form', data);
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error submitting health form data:", error);
    throw new Error(error.message || "Failed to submit health form data");
  }
};
