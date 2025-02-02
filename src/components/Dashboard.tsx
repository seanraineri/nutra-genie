import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HealthAssistant } from "./dashboard/HealthAssistant";
import { HealthMetrics } from "./dashboard/HealthMetrics";
import { SupplementPlan } from "./dashboard/SupplementPlan";
import { HealthGoals } from "./dashboard/HealthGoals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-2 md:py-8 px-2 md:px-6 animate-fade-in">
        <Tabs defaultValue="assistant" className="w-full space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0"
                onClick={() => navigate("/")}
              >
                <ChevronLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Back</span>
              </Button>
              <h1 className="text-xl md:text-3xl font-bold text-secondary truncate">
                Your Health Dashboard
              </h1>
            </div>
            <TabsList className="bg-background border w-full md:w-auto grid grid-cols-4 gap-1">
              <TabsTrigger 
                value="assistant" 
                className="px-2 md:px-6 text-sm"
              >
                <span className="truncate">Assistant</span>
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="px-2 md:px-6 text-sm"
              >
                <span className="truncate">Metrics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="supplements" 
                className="px-2 md:px-6 text-sm"
              >
                <span className="truncate">Plan</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="px-2 md:px-6 text-sm"
              >
                <span className="truncate">Goals</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-2 md:mt-6">
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