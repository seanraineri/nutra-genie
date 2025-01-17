import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 md:py-8 px-2 md:px-6 animate-fade-in">
        <Tabs defaultValue="assistant" className="w-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0"
                onClick={() => navigate("/")}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary truncate">
                Your Health Dashboard
              </h1>
            </div>
            <TabsList className="bg-background border w-full md:w-auto">
              <TabsTrigger 
                value="assistant" 
                className="flex-1 md:flex-none px-3 md:px-6"
                onClick={handleSignUpPrompt}
              >
                Assistant
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="flex-1 md:flex-none px-3 md:px-6"
                onClick={handleSignUpPrompt}
              >
                Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="supplements" 
                className="flex-1 md:flex-none px-3 md:px-6"
                onClick={handleSignUpPrompt}
              >
                Plan
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="flex-1 md:flex-none px-3 md:px-6"
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
  );
};