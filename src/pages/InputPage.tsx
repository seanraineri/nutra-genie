import { HealthDataForm } from "@/components/HealthDataForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <HealthDataForm />
      </div>
    </div>
  );
};

export default InputPage;