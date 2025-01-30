import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/health-form/StepWizard";
import { GridBackground } from "@/components/backgrounds/GridBackground";

const InputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-cyan-950 to-slate-950">
      <GridBackground />
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