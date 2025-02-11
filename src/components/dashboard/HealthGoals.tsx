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

      <Card className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)] relative z-10 m-6 backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
        <div className="px-3 py-2 md:p-6 border-b bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="space-y-0.5 md:space-y-1">
                <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] tracking-wide">
                  Health Goals
                </h2>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size={isMobile ? "sm" : "icon"}
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
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleJournalClick}
                className="flex-1 md:flex-none py-5 md:py-2 bg-white/10 text-white border border-white/30 hover:bg-gradient-to-r hover:from-[#0EA5E9] hover:to-[#10B981] hover:border-transparent active:from-[#0EA5E9]/90 active:to-[#10B981]/90 transition-all duration-200 gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="text-sm md:text-base">Journal</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex-1 md:flex-none py-5 md:py-2 bg-white/10 text-white border border-white/30 hover:bg-gradient-to-r hover:from-[#0EA5E9] hover:to-[#10B981] hover:border-transparent active:from-[#0EA5E9]/90 active:to-[#10B981]/90 transition-all duration-200"
              >
                <span className="text-sm md:text-base">{isEditing ? "Save Changes" : "Edit Goals"}</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-1">
            <TabsTrigger 
              value="goals"
              className="text-sm md:text-base text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide py-3"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger 
              value="biomarkers"
              className="text-sm md:text-base text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide py-3"
            >
              Biomarkers
            </TabsTrigger>
            <TabsTrigger 
              value="genes"
              className="text-sm md:text-base text-white data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white transition-all duration-300 font-medium tracking-wide py-3"
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
      </Card>

      <div className="mx-6 mb-6">
        <Card className="backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
          <div className="p-4">
            <XPStore />
          </div>
        </Card>
      </div>
    </div>
  );
};
