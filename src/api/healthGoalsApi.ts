
import { client } from "@/integrations/supabase/client";

export const addHealthGoal = async (goal: {
  goal_name: string;
  description?: string;
  target?: number;
  progress?: number;
  category: string;
}) => {
  const response = await client.post('/api/goals', goal);
  return response;
};

export const addGoalScore = async (goalId: string, score: number, notes?: string) => {
  const response = await client.post(`/api/goals/${goalId}/scores`, { score, notes });
  return response;
};
