import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoalItem } from "./goals/GoalItem";
import { GoalsSkeleton } from "./goals/GoalsSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Goal {
  id: string;
  goal_name: string;
  description?: string;
  progress: number;
  target: number;
}

export const HealthGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('health_goals')
      .select('id, goal_name, description, progress, target')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
      return;
    }

    const formattedGoals = (data || []).map(goal => ({
      ...goal,
      progress: Number(goal.progress) || 0,
      target: Number(goal.target) || 100
    }));

    setGoals(formattedGoals);
    setLoading(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved successfully",
      description: "Your health goals have been updated.",
    });
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Health Goals</h2>
        <Button
          variant="outline"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Goals"}
        </Button>
      </div>

      <Tabs defaultValue="fitness" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {loading ? (
          <GoalsSkeleton />
        ) : (
          <>
            <TabsContent value="fitness" className="space-y-4">
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onUpdate={fetchGoals}
                    isEditing={isEditing}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No fitness goals set yet. Click "Edit Goals" to add some.
                </p>
              )}
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onUpdate={fetchGoals}
                    isEditing={isEditing}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No nutrition goals set yet. Click "Edit Goals" to add some.
                </p>
              )}
            </TabsContent>

            <TabsContent value="wellness" className="space-y-4">
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onUpdate={fetchGoals}
                    isEditing={isEditing}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No wellness goals set yet. Click "Edit Goals" to add some.
                </p>
              )}
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <GoalItem 
                    key={goal.id} 
                    goal={goal} 
                    onUpdate={fetchGoals}
                    isEditing={isEditing}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No other goals set yet. Click "Edit Goals" to add some.
                </p>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </Card>
  );
};