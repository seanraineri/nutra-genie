import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Goal {
  id: string;
  goal_name: string;
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

  const handleSave = async () => {
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
            <span className="font-medium">{goal.goal_name}</span>
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
              {Math.round((goal.progress / goal.target) * 100)}%
            </span>
          </div>
          <Progress value={(goal.progress / goal.target) * 100} />
        </div>
      )}
    </div>
  );
};