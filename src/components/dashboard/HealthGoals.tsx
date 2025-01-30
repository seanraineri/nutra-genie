import { Button } from "@/components/ui/button";
import { Plus, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoalItem } from "./goals/GoalItem";
import { SymptomTracker } from "./goals/SymptomTracker";
import { XPStore } from "./goals/XPStore";
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
          <Card key={goal.id} className="p-4">
            <GoalItem 
              goal={goal} 
              onUpdate={fetchGoals}
              isEditing={isEditing}
            />
          </Card>
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#1E293B] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#0EA5E9_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#10B981_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#0EA5E9_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "4s" }} />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <Card className="m-6 backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 md:gap-4">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC] bg-clip-text text-transparent">Health Goals</h2>
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
                    Track your progress towards your goals and earn XP for completing activities
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                variant="outline"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="bg-transparent border border-[#0EA5E9]/50 hover:border-[#0EA5E9] transition-all duration-500"
              >
                {isEditing ? "Save Changes" : "Edit Goals"}
              </Button>
            </div>

            <Tabs defaultValue="fitness" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 bg-background/50 backdrop-blur-sm">
                <TabsTrigger value="fitness">Fitness</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="wellness">Wellness</TabsTrigger>
                <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
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

              <TabsContent value="biomarkers" className="space-y-4">
                {renderGoalsList('biomarkers')}
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6 mb-6">
          <div className="md:col-span-2">
            <Card className="backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
              <div className="p-4">
                <XPStore />
              </div>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
              <div className="p-4">
                <SymptomTracker />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};