
export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  ok: boolean;
  url?: string;
}

export interface HealthScore {
  id: string;
  score: number;
  created_at: string;
  notes?: string;
}

export interface SymptomEntry {
  symptom: string;
  severity: number;
  notes?: string;
  date?: string;
}

export interface APIError {
  message: string;
  status?: number;
}
