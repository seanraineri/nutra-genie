
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const SymptomTracker = () => {
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [otherSymptoms, setOtherSymptoms] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('symptom_tracking')
        .insert([
          {
            user_id: user.id,
            symptom: "Energy Level",
            severity: energyLevel,
            notes: "Daily energy tracking"
          },
          {
            user_id: user.id,
            symptom: "Sleep Quality",
            severity: sleepQuality,
            notes: "Daily sleep quality tracking"
          },
          {
            user_id: user.id,
            symptom: "Stress/Anxiety",
            severity: stressLevel,
            notes: "Daily stress tracking"
          },
          ...(otherSymptoms ? [{
            user_id: user.id,
            symptom: "Other",
            severity: 0,
            notes: otherSymptoms
          }] : [])
        ]);

      if (error) throw error;

      toast({
        title: "Wellness tracked",
        description: "Your wellness entry has been recorded successfully.",
      });

      // Reset form
      setEnergyLevel(3);
      setStressLevel(3);
      setSleepQuality(3);
      setOtherSymptoms("");
    } catch (error) {
      console.error('Error tracking wellness:', error);
      toast({
        title: "Error",
        description: "Failed to save wellness entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Daily Wellness Journal</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>How is your energy today?</Label>
          <div className="space-y-3">
            <Slider
              value={[energyLevel]}
              onValueChange={(value) => setEnergyLevel(value[0])}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Low Energy</span>
              <span className="ml-auto">Great Energy</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>How well did you sleep?</Label>
          <div className="space-y-3">
            <Slider
              value={[sleepQuality]}
              onValueChange={(value) => setSleepQuality(value[0])}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Poor Sleep</span>
              <span className="ml-auto">Great Sleep</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Did you feel anxious or stressed today?</Label>
          <div className="space-y-3">
            <Slider
              value={[stressLevel]}
              onValueChange={(value) => setStressLevel(value[0])}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Not at all</span>
              <span className="ml-auto">Very</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Any other symptoms you want to track?</Label>
          <Textarea
            placeholder="Enter any other symptoms or notes here..."
            value={otherSymptoms}
            onChange={(e) => setOtherSymptoms(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Record Wellness Entry
        </Button>
      </form>
    </Card>
  );
};
