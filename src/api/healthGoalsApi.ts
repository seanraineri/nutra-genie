
import { client } from "@/integrations/supabase/client";
import type { APIResponse } from "@/types/api";

export interface HealthGoal {
  goal_name: string;
  description?: string;
  target?: number;
  progress?: number;
  category: string;
}

export interface GoalScore {
  score: number;
  notes?: string;
  date?: string;
}

export const addHealthGoal = async (goal: HealthGoal): Promise<APIResponse<HealthGoal>> => {
  return await client.post('/api/goals', goal);
};

export const addGoalScore = async (goalId: string, score: number, notes?: string): Promise<APIResponse<GoalScore>> => {
  return await client.post(`/api/goals/${goalId}/scores`, { score, notes });
};

export const getGoalScores = async (goalId: string): Promise<APIResponse<GoalScore[]>> => {
  return await client.get(`/api/goals/${goalId}/scores`);
};

export const updateGoal = async (goalId: string, goal: Partial<HealthGoal>): Promise<APIResponse<HealthGoal>> => {
  return await client.put(`/api/goals/${goalId}`, goal);
};
