import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Goal {
  id: string;
  goal_name: string;
  progress: number;
  target: number;
}

export const HealthGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial data
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

  const handleEdit = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setEditedGoal(goal);
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
    setEditedGoal(null);
  };

  const handleSave = async (goal: Goal) => {
    if (!editedGoal) return;

    try {
      const { error } = await supabase
        .from('health_goals')
        .update({
          goal_name: editedGoal.goal_name,
          progress: editedGoal.progress,
          target: editedGoal.target
        })
        .eq('id', goal.id);

      if (error) throw error;

      toast({
        title: "Goal updated",
        description: "Your health goal has been updated successfully.",
      });

      setEditingGoalId(null);
      setEditedGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            {editingGoalId === goal.id ? (
              <div className="space-y-2">
                <Input
                  value={editedGoal?.goal_name}
                  onChange={(e) =>
                    setEditedGoal((prev) =>
                      prev ? { ...prev, goal_name: e.target.value } : null
                    )
                  }
                  className="font-medium"
                />
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={editedGoal?.progress}
                    onChange={(e) =>
                      setEditedGoal((prev) =>
                        prev ? { ...prev, progress: Number(e.target.value) } : null
                      )
                    }
                    className="w-20"
                  />
                  <span>/</span>
                  <Input
                    type="number"
                    value={editedGoal?.target}
                    onChange={(e) =>
                      setEditedGoal((prev) =>
                        prev ? { ...prev, target: Number(e.target.value) } : null
                      )
                    }
                    className="w-20"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave(goal)}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.goal_name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(goal)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress: {goal.progress} / {goal.target}
                  </span>
                  <span className="text-muted-foreground">
                    {Math.round((goal.progress / goal.target) * 100)}%
                  </span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} />
              </div>
            )}
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