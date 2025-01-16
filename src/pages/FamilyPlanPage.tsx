import { HealthDataForm } from "@/components/HealthDataForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FamilyPlanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
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
        </div>
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Family Health Plan</h1>
          <p className="text-center text-muted-foreground">
            Register your family members and manage everyone's health in one place.
          </p>
        </div>
        <HealthDataForm isFamilyPlan={true} />
      </div>
    </div>
  );
};

export default FamilyPlanPage;