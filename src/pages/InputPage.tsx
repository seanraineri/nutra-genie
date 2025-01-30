import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/health-form/StepWizard";
import { GridBackground } from "@/components/backgrounds/GridBackground";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Softer gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-cyan-500/5 via-cyan-900/20 to-slate-950/90 pointer-events-none" />
      
      {/* Grid background */}
      <GridBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 text-cyan-100 hover:text-cyan-50 hover:bg-cyan-500/10"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <StepWizard />
        </div>
      </div>
    </div>
  );
};

export default InputPage;