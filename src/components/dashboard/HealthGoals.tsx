import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { GoalItem } from "./goals/GoalItem";
import { GoalsSkeleton } from "./goals/GoalsSkeleton";

interface Goal {
  id: string;
  goal_name: string;
  progress: number;
  target: number;
}

export const HealthGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('health_goals')
      .select('id, goal_name, progress, target')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
      return;
    }

    setGoals(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchGoals();

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
        {loading ? (
          <GoalsSkeleton />
        ) : goals.length > 0 ? (
          goals.map((goal) => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onUpdate={fetchGoals}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No health goals set yet. Chat with the health assistant to set your goals.
          </p>
        )}
      </div>
    </Card>
  );
};