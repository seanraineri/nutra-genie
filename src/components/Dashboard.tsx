import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HealthAssistant } from "./dashboard/HealthAssistant";
import { HealthMetrics } from "./dashboard/HealthMetrics";
import { SupplementPlan } from "./dashboard/SupplementPlan";
import { HealthGoals } from "./dashboard/HealthGoals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-secondary">Your Health Dashboard</h1>
      </div>

      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="assistant">Health Assistant</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="supplements">Supplement Plan</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
        </TabsList>

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