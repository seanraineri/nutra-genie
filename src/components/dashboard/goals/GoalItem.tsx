import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Pencil, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
}

export const GoalItem = ({ goal, onUpdate }: GoalItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(null);
  const { toast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
    setEditedGoal(goal);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedGoal(null);
  };

  const calculateProgress = (progress: number, target: number): number => {
    if (isNaN(progress) || isNaN(target) || target === 0) {
      return 0;
    }
    return (progress / target) * 100;
  };

  const handleSave = async () => {
    if (!editedGoal) return;

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

      setIsEditing(false);
      setEditedGoal(null);
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
    <div className="space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editedGoal?.goal_name}
            onChange={(e) =>
              setEditedGoal((prev) =>
                prev ? { ...prev, goal_name: e.target.value } : null
              )
            }
            className="font-medium"
            placeholder="Goal name"
          />
          <Textarea
            value={editedGoal?.description || ""}
            onChange={(e) =>
              setEditedGoal((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
            placeholder="Add a description for your goal"
            className="min-h-[80px]"
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
              className="w-32"
              placeholder="Progress"
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
              className="w-32"
              placeholder="Target"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
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
            <div>
              <span className="font-medium block">{goal.goal_name}</span>
              {goal.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {goal.description}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
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
              {Math.round(calculateProgress(goal.progress, goal.target))}%
            </span>
          </div>
          <Progress value={calculateProgress(goal.progress, goal.target)} />
        </div>
      )}
    </div>
  );
};