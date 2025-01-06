import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface Goal {
  goal_name: string;
  progress: number;
  target: number;
}

export const HealthGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // Fetch initial data
    const fetchGoals = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('health_goals')
        .select('goal_name, progress, target')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching goals:', error);
        return;
      }

      setGoals(data || []);
    };

    fetchGoals();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'health_goals'
        },
        () => {
          fetchGoals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{goal.goal_name}</span>
              <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
            </div>
            <Progress value={(goal.progress / goal.target) * 100} />
          </div>
        ))}
        {goals.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No health goals set yet. Chat with the health assistant to set your goals.
          </p>
        )}
      </div>
    </Card>
  );
};