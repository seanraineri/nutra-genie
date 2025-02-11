
import { SymptomTracker } from "@/components/dashboard/goals/SymptomTracker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const JournalPage = () => {
  const navigate = useNavigate();
  const [tookSupplements, setTookSupplements] = useState<string>("");
  const { toast } = useToast();

  const handleSupplementsSubmit = async () => {
    try {
      const { error } = await supabase
        .from('supplement_tracking')
        .insert({
          took_supplements: tookSupplements === "yes",
          date: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Recorded successfully",
        description: "Your supplement intake has been tracked.",
      });
    } catch (error) {
      console.error('Error tracking supplements:', error);
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            <h3 className="text-lg font-semibold mb-4">Daily Supplement Check</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base">Did you take your supplements today?</Label>
                <RadioGroup
                  value={tookSupplements}
                  onValueChange={setTookSupplements}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button 
                onClick={handleSupplementsSubmit}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!tookSupplements}
              >
                Save Response
              </Button>
            </div>
          </div>
        </Card>

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
