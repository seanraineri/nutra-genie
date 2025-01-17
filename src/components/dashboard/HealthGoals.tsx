import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoalItem } from "./goals/GoalItem";
import { SymptomTracker } from "./goals/SymptomTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addHealthGoal } from "@/api/healthGoalsApi";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";

interface Goal {
  id: string;
  goal_name: string;
  description?: string;
  progress: number;
  target: number;
  category: string;
}

export const HealthGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('health_goals')
      .select('id, goal_name, description, progress, target, category')
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
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved successfully",
      description: "Your health goals have been updated.",
    });
  };

  const handleAddGoal = async (category: string) => {
    try {
      await addHealthGoal({
        goal_name: "New Goal",
        description: "Click edit to modify this goal",
        target: 100,
        progress: 0,
        category
      });

      toast({
        title: "Goal added",
        description: "New goal has been created successfully.",
      });

      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal. Please try again.",
        variant: "destructive",
      });
    }
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

  const renderGoalsList = (category: string) => {
    const filteredGoals = goals.filter(goal => goal.category === category);
    
    return (
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <GoalItem 
            key={goal.id} 
            goal={goal} 
            onUpdate={fetchGoals}
            isEditing={isEditing}
          />
        ))}
        <Button
          variant="ghost"
          className="w-full border-2 border-dashed border-muted hover:border-muted-foreground p-8"
          onClick={() => handleAddGoal(category)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Goal
        </Button>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Health Goals</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-primary/10 active:bg-primary active:text-primary-foreground focus:bg-primary focus:text-primary-foreground transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[300px] text-sm bg-card text-card-foreground shadow-md border">
              Track your progress towards your goals and receive weekly recaps for completing your journal everyday
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant="outline"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Goals"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="fitness" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="fitness">Fitness</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="fitness" className="space-y-4">
              {renderGoalsList('fitness')}
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              {renderGoalsList('nutrition')}
            </TabsContent>

            <TabsContent value="wellness" className="space-y-4">
              {renderGoalsList('wellness')}
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              {renderGoalsList('other')}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <SymptomTracker />
        </div>
      </div>
    </Card>
  );
};
