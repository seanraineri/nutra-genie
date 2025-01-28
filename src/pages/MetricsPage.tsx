import { HealthMetrics } from "@/components/dashboard/HealthMetrics";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MetricsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <HealthMetrics />
      </div>
    </div>
  );
};

export default MetricsPage;