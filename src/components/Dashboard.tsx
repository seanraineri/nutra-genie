import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HealthAssistant } from "./dashboard/HealthAssistant";
import { HealthMetrics } from "./dashboard/HealthMetrics";
import { SupplementPlan } from "./dashboard/SupplementPlan";
import { HealthGoals } from "./dashboard/HealthGoals";

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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,600px] gap-6">
        {/* Right Panel - Chat Interface (Now given more space) */}
        <div className="order-2 lg:order-1">
          <HealthAssistant />
        </div>

        {/* Left Panel - Health Data */}
        <div className="space-y-6 order-1 lg:order-2">
          <HealthMetrics />
          <SupplementPlan />
          <HealthGoals />
        </div>
      </div>
    </div>
  );
};