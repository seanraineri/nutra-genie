
import { mockApiCall } from "@/integrations/supabase/client";

export const addHealthGoal = async (goal: {
  goal_name: string;
  description?: string;
  target?: number;
  progress?: number;
  category: string;
}) => {
  await mockApiCall();
  console.log('Mock adding health goal:', goal);
};

export const addGoalScore = async (goalId: string, score: number, notes?: string) => {
  await mockApiCall();
  console.log('Mock adding goal score:', { goalId, score, notes });
};
