import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, CheckSquare, Gift, User, BookOpen } from "lucide-react";
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
    <div className="min-h-screen bg-[#F2FCE2]">
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-around px-4 z-50">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => navigate("/")}
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => navigate("/goals")}
        >
          <CheckSquare className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => navigate("/rewards")}
        >
          <Gift className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => navigate("/metrics")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-20 bg-gradient-to-b from-cyan-500 to-teal-500 md:flex md:flex-col md:items-center md:py-6 md:space-y-8">
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
            onClick={() => navigate("/goals")}
          >
            <CheckSquare className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={() => navigate("/rewards")}
          >
            <Gift className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-white/10 text-white"
            onClick={() => navigate("/metrics")}
          >
            <User className="h-6 w-6" />
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-20 pb-20 md:pb-0">
        <div className="container mx-auto py-4 px-4 md:py-8 md:px-6 animate-fade-in">
          <Tabs defaultValue="assistant" className="w-full space-y-4 md:space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#1C3B4B]"
                  onClick={() => navigate("/")}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-xl md:text-3xl font-bold text-[#333] truncate">
                  Dashboard
                </h1>
              </div>
              <TabsList className="bg-[#1C3B4B] border-none w-full md:w-auto grid grid-cols-2 gap-1 md:flex">
                <TabsTrigger 
                  value="assistant" 
                  className="px-2 md:px-6 text-sm md:text-base text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Assistant
                </TabsTrigger>
                <TabsTrigger 
                  value="supplements" 
                  className="px-2 md:px-6 text-sm md:text-base text-white data-[state=active]:bg-primary"
                  onClick={handleSignUpPrompt}
                >
                  Plan
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-4">
              <TabsContent value="assistant" className="m-0">
                <HealthAssistant />
              </TabsContent>

              <TabsContent value="supplements" className="m-0">
                <SupplementPlan />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};