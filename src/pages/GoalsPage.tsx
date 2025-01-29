import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HealthGoals } from "@/components/dashboard/HealthGoals";

export default function GoalsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2FCE2] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#1C3B4B]"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#333]">
            Health Goals
          </h1>
        </div>
        
        <HealthGoals />
      </div>
    </div>
  );
}