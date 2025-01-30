import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/health-form/StepWizard";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Gradient Background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-emerald-500/10 animate-gradient-flow"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(8, 145, 178, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(20, 184, 166, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 hover:bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <StepWizard />
      </div>
    </div>
  );
};

export default InputPage;