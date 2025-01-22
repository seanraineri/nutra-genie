import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addGoalScore } from "@/api/healthGoalsApi";

interface GoalScore {
  id: string;
  score: number;
  notes?: string;
  created_at: string;
}

interface GoalScoresProps {
  goalId: string;
}

export const GoalScores = ({ goalId }: GoalScoresProps) => {
  const [scores, setScores] = useState<GoalScore[]>([]);
  const [newScore, setNewScore] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('goal_scores')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching scores:', error);
        return;
      }

      setScores(data || []);
    };

    fetchScores();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'goal_scores',
          filter: `goal_id=eq.${goalId}`
        },
        () => {
          fetchScores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [goalId]);

  const handleAddScore = async () => {
    try {
      const scoreNum = parseInt(newScore);
      if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        throw new Error("Score must be between 0 and 100");
      }

      await addGoalScore(goalId, scoreNum);
      setNewScore("");
      
      toast({
        title: "Score added",
        description: "Your goal score has been recorded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add score. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getLatestScore = () => {
    return scores.length > 0 ? scores[0].score : 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Current Score</span>
        <span className="font-medium">{getLatestScore()}/100</span>
      </div>
      <Progress value={getLatestScore()} className="h-2" />
      
      <div className="flex gap-2">
        <Input
          type="number"
          min="0"
          max="100"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          placeholder="Enter score (0-100)"
          className="w-40"
        />
        <Button onClick={handleAddScore} size="sm">
          Add Score
        </Button>
      </div>

      {scores.length > 1 && (
        <div className="text-xs text-muted-foreground mt-1">
          Previous scores: {scores.slice(1).map(s => s.score).join(', ')}
        </div>
      )}
    </div>
  );
};