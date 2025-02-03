import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/health-form/StepWizard";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 relative">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 border-cyan-200/20"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <img 
            src="/lovable-uploads/3ac3b205-09c1-4160-88b8-65e4fd82034a.png" 
            alt="SupplementScribe Logo" 
            className="h-12 w-auto absolute left-1/2 transform -translate-x-1/2"
          />
        </div>
        <div className="mt-16">
          <StepWizard />
        </div>
      </div>
    </div>
  );
};

export default InputPage;