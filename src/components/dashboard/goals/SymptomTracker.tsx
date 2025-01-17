import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [wellnessType, setWellnessType] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const wellnessTypes = [
    "Energy Level",
    "Mental Clarity",
    "Physical Activity",
    "Sleep Quality",
    "Mood",
    "Digestion",
    "Overall Wellness"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('symptom_tracking')
        .insert({
          symptom: wellnessType,
          severity: parseInt(rating),
          notes
        });

      if (error) throw error;

      toast({
        title: "Wellness tracked",
        description: "Your wellness entry has been recorded successfully.",
      });

      // Reset form
      setWellnessType("");
      setRating("");
      setNotes("");
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
      <p className="text-muted-foreground text-sm mb-4">
        Track your daily wellness journey and celebrate your progress
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Select
            value={wellnessType}
            onValueChange={setWellnessType}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="What would you like to track?" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {wellnessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={rating}
            onValueChange={setRating}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="How are you feeling? (1-10)" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {[...Array(10)].map((_, i) => {
                const value = i + 1;
                return (
                  <SelectItem key={value} value={value.toString()}>
                    {value}{value === 1 ? " - Poor :(" : value === 10 ? " - Amazing!" : ""}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Textarea
            placeholder="Share your wellness journey... What's working well? What makes you feel energized today?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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