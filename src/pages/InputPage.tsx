import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/health-form/StepWizard";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),rgba(20,184,166,0.15)_30%,rgba(15,23,42,0.95))]" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        </div>
        <div className="container mx-auto px-4 py-8">
          <StepWizard />
        </div>
      </div>
      
      {/* Subtle floating orbs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-circular" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-float-circular" style={{ animationDelay: '-10s' }} />
      </div>
    </div>
  );
};

export default InputPage;