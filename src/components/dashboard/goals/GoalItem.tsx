import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoalScores } from "./GoalScores";

interface Goal {
  id: string;
  goal_name: string;
  description?: string;
  progress: number;
  target: number;
}

interface GoalItemProps {
  goal: Goal;
  onUpdate: () => void;
  isEditing: boolean;
}

export const GoalItem = ({ goal, onUpdate, isEditing }: GoalItemProps) => {
  const [editedGoal, setEditedGoal] = useState<Goal>(goal);
  const { toast } = useToast();

  const calculateProgress = (progress: number, target: number): number => {
    if (isNaN(progress) || isNaN(target) || target === 0) {
      return 0;
    }
    return (progress / target) * 100;
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('health_goals')
        .update({
          goal_name: editedGoal.goal_name,
          description: editedGoal.description,
          progress: editedGoal.progress,
          target: editedGoal.target
        })
        .eq('id', goal.id);

      if (error) throw error;

      toast({
        title: "Goal updated",
        description: "Your health goal has been updated successfully.",
      });

      onUpdate();
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
    <div className="space-y-4">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editedGoal.goal_name}
            onChange={(e) =>
              setEditedGoal((prev) => ({ ...prev, goal_name: e.target.value }))
            }
            className="font-medium"
            placeholder="Goal name"
          />
          <Textarea
            value={editedGoal.description || ""}
            onChange={(e) =>
              setEditedGoal((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Add a description for your goal"
            className="min-h-[80px] resize-none"
          />
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={editedGoal.progress}
              onChange={(e) =>
                setEditedGoal((prev) => ({
                  ...prev,
                  progress: Number(e.target.value)
                }))
              }
              className="w-32"
              placeholder="Progress"
            />
            <span>/</span>
            <Input
              type="number"
              value={editedGoal.target}
              onChange={(e) =>
                setEditedGoal((prev) => ({
                  ...prev,
                  target: Number(e.target.value)
                }))
              }
              className="w-32"
              placeholder="Target"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium block">{goal.goal_name}</span>
              {goal.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {goal.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Progress: {goal.progress} / {goal.target}
            </span>
            <span className="text-muted-foreground">
              {Math.round(calculateProgress(goal.progress, goal.target))}%
            </span>
          </div>
          <Progress value={calculateProgress(goal.progress, goal.target)} />
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Goal Score History</h4>
            <GoalScores goalId={goal.id} />
          </div>
        </div>
      )}
    </div>
  );
};