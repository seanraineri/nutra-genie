import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SymptomTracker = () => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('symptom_tracking')
        .insert({
          symptom,
          severity: parseInt(severity),
          notes
        });

      if (error) throw error;

      toast({
        title: "Symptom tracked",
        description: "Your symptom has been recorded successfully.",
      });

      // Reset form
      setSymptom("");
      setSeverity("");
      setNotes("");
    } catch (error) {
      console.error('Error tracking symptom:', error);
      toast({
        title: "Error",
        description: "Failed to track symptom. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Daily Symptom Tracker</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Enter symptom (e.g., headache, fatigue)"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
          />
        </div>
        <div>
          <Select
            value={severity}
            onValueChange={setSeverity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity (0-10)" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(11)].map((_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i} - {i === 0 ? "None" : i === 10 ? "Severe" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Textarea
            placeholder="Additional notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" className="w-full">
          Track Symptom
        </Button>
      </form>
    </Card>
  );
};