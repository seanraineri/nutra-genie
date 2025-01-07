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
    <div className="container mx-auto py-4 md:py-8 px-2 md:px-6 animate-fade-in">
      <Tabs defaultValue="assistant" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary truncate">
              Your Health Dashboard
            </h1>
          </div>
          <TabsList className="bg-background border w-full md:w-auto overflow-x-auto">
            <TabsTrigger 
              value="assistant" 
              className="flex-1 md:flex-none px-3 md:px-6"
            >
              {isMobile ? "Assistant" : "Health Assistant"}
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="flex-1 md:flex-none px-3 md:px-6"
            >
              {isMobile ? "Metrics" : "Health Metrics"}
            </TabsTrigger>
            <TabsTrigger 
              value="supplements" 
              className="flex-1 md:flex-none px-3 md:px-6"
            >
              {isMobile ? "Plan" : "Supplement Plan"}
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="flex-1 md:flex-none px-3 md:px-6"
            >
              {isMobile ? "Goals" : "Health Goals"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="assistant" className="mt-0">
          <HealthAssistant />
        </TabsContent>

        <TabsContent value="metrics" className="mt-0">
          <HealthMetrics />
        </TabsContent>

        <TabsContent value="supplements" className="mt-0">
          <SupplementPlan />
        </TabsContent>

        <TabsContent value="goals" className="mt-0">
          <HealthGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};