
import { SymptomTracker } from "@/components/dashboard/goals/SymptomTracker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JournalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#1E293B] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full hover:bg-white/10 text-white"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Back to Dashboard</span>
          </Button>
          <h1 className="text-2xl font-bold text-white">Health Journal</h1>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20">
          <div className="p-6">
            <SymptomTracker />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JournalPage;
