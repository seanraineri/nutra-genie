
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('supplement_tracking')
        .insert({
          took_supplements: tookSupplements === "yes",
          date: new Date().toISOString(),
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Recorded successfully",
        description: "Your supplement intake has been tracked.",
      });
      
      setTookSupplements(""); // Reset after successful submission
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

        <Card className="backdrop-blur-xl bg-white border-[#0EA5E9]/20">
          <div className="p-8">
            <div className="max-w-lg mx-auto text-center">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                Daily Supplement Check
              </h3>
              <div className="space-y-6">
                <Label className="text-lg block text-gray-700">
                  Did you take your supplements today?
                </Label>
                <RadioGroup
                  value={tookSupplements}
                  onValueChange={setTookSupplements}
                  className="flex justify-center gap-8"
                >
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-24 h-24 rounded-xl border-2 border-[#0EA5E9]/30 hover:border-[#0EA5E9] transition-all duration-300 relative bg-gradient-to-r from-[#0EA5E9]/5 to-[#10B981]/5 hover:from-[#0EA5E9]/10 hover:to-[#10B981]/10">
                        <RadioGroupItem value="yes" id="yes" className="absolute inset-0 w-full h-full rounded-xl cursor-pointer" />
                      </div>
                      <Label 
                        htmlFor="yes" 
                        className="text-lg font-medium text-gray-700 hover:text-[#0EA5E9] transition-colors"
                      >
                        Yes
                      </Label>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-24 h-24 rounded-xl border-2 border-[#0EA5E9]/30 hover:border-[#0EA5E9] transition-all duration-300 relative bg-gradient-to-r from-[#0EA5E9]/5 to-[#10B981]/5 hover:from-[#0EA5E9]/10 hover:to-[#10B981]/10">
                        <RadioGroupItem value="no" id="no" className="absolute inset-0 w-full h-full rounded-xl cursor-pointer" />
                      </div>
                      <Label 
                        htmlFor="no" 
                        className="text-lg font-medium text-gray-700 hover:text-[#0EA5E9] transition-colors"
                      >
                        No
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                <Button 
                  onClick={handleSupplementsSubmit}
                  className="w-full max-w-xs mx-auto mt-8 bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:opacity-90 transition-opacity"
                  disabled={!tookSupplements}
                  size="lg"
                >
                  Save Response
                </Button>
              </div>
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
