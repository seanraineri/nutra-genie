import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, Trophy, Gift, User, MoreHorizontal, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HealthAssistant } from "./dashboard/HealthAssistant";
import { HealthMetrics } from "./dashboard/HealthMetrics";
import { SupplementPlan } from "./dashboard/SupplementPlan";
import { HealthGoals } from "./dashboard/HealthGoals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSignUpPrompt = () => {
    toast({
      title: "Create an account to save your progress",
      description: "Sign up to unlock all features and track your health journey.",
      action: (
        <Button
          onClick={() => navigate("/input")}
          variant="default"
          size="sm"
        >
          Sign Up
        </Button>
      ),
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2] text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-cyan-500 to-teal-500 flex flex-col items-center py-6 space-y-8">
        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        
        <nav className="flex-1 flex flex-col items-center space-y-6">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={() => navigate("/")}
          >
            <Home className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={handleSignUpPrompt}
          >
            <Trophy className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={handleSignUpPrompt}
          >
            <Gift className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={handleSignUpPrompt}
          >
            <User className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={handleSignUpPrompt}
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-20">
        <div className="container mx-auto py-4 md:py-8 px-2 md:px-6 animate-fade-in">
          <Tabs defaultValue="assistant" className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-white"
                  onClick={() => navigate("/")}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold text-white truncate">
                  Your Health Journey
                </h1>
              </div>
              <TabsList className="bg-[#1C3B4B] border-none w-full md:w-auto">
                <TabsTrigger 
                  value="assistant" 
                  className="flex-1 md:flex-none px-3 md:px-6 text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Assistant
                </TabsTrigger>
                <TabsTrigger 
                  value="metrics" 
                  className="flex-1 md:flex-none px-3 md:px-6 text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Metrics
                </TabsTrigger>
                <TabsTrigger 
                  value="supplements" 
                  className="flex-1 md:flex-none px-3 md:px-6 text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Plan
                </TabsTrigger>
                <TabsTrigger 
                  value="goals" 
                  className="flex-1 md:flex-none px-3 md:px-6 text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Goals
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-4 md:mt-6">
              <TabsContent value="assistant" className="m-0">
                <HealthAssistant />
              </TabsContent>

              <TabsContent value="metrics" className="m-0">
                <HealthMetrics />
              </TabsContent>

              <TabsContent value="supplements" className="m-0">
                <SupplementPlan />
              </TabsContent>

              <TabsContent value="goals" className="m-0">
                <HealthGoals />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};