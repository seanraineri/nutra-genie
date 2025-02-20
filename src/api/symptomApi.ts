
import { client } from "@/integrations/supabase/client";
import type { APIResponse, SymptomEntry } from "@/types/api";

export const addSymptomEntry = async (symptoms: SymptomEntry[]): Promise<APIResponse<SymptomEntry[]>> => {
  return await client.post('/api/symptoms', symptoms);
};

export const getSymptomHistory = async (): Promise<APIResponse<SymptomEntry[]>> => {
  return await client.get('/api/symptoms');
};
