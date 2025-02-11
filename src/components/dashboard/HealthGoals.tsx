import { Button } from "@/components/ui/button";
import { Plus, HelpCircle, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GoalItem } from "./goals/GoalItem";
import { XPStore } from "./goals/XPStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addHealthGoal } from "@/api/healthGoalsApi";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  const handleJournalClick = () => {
    navigate("journal");
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
          variant="outline"
          className="w-full bg-gradient-to-r from-[#0EA5E9]/20 to-[#10B981]/20 hover:from-[#0EA5E9]/30 hover:to-[#10B981]/30 border-2 border-dashed border-[#0EA5E9]/50 hover:border-[#0EA5E9] transition-all duration-300 p-8 group shadow-lg hover:shadow-xl hover:scale-[1.01]"
          onClick={() => handleAddGoal(category)}
        >
          <Plus className="mr-2 h-5 w-5 text-[#0EA5E9] group-hover:scale-110 transition-transform" />
          <span className="text-lg font-semibold bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
            Add New Goal
          </span>
        </Button>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-wider text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  Health Goals
                </h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white hover:bg-white/20 active:bg-white/30"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[300px] text-sm bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-[#0EA5E9]/20">
                    Track your progress towards your goals and earn XP for completing activities
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleJournalClick}
                  className="py-3 px-4 bg-white/10 text-white border border-white/30 gap-2 w-full sm:w-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  Journal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="py-3 px-4 bg-white/10 text-white border border-white/30 w-full sm:w-auto"
                >
                  {isEditing ? "Save Changes" : "Edit Goals"}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="goals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-1">
                <TabsTrigger 
                  value="goals"
                  className="text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide"
                >
                  Goals
                </TabsTrigger>
                <TabsTrigger 
                  value="biomarkers"
                  className="text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide"
                >
                  Biomarkers
                </TabsTrigger>
                <TabsTrigger 
                  value="genes"
                  className="text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide"
                >
                  Genes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="goals" className="space-y-4">
                {renderGoalsList('goals')}
              </TabsContent>

              <TabsContent value="biomarkers" className="space-y-4">
                {renderGoalsList('biomarkers')}
              </TabsContent>

              <TabsContent value="genes" className="space-y-4">
                {renderGoalsList('genes')}
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <div className="mx-6 mb-6">
          <Card className="backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
            <div className="p-4">
              <XPStore />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
