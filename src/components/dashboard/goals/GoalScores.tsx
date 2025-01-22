import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

    // Subscribe to realtime updates
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

  const getLatestScore = () => {
    return scores.length > 0 ? scores[0].score : 0;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Current Score</span>
        <span className="font-medium">{getLatestScore()}/100</span>
      </div>
      <Progress value={getLatestScore()} className="h-2" />
      {scores.length > 1 && (
        <div className="text-xs text-muted-foreground mt-1">
          Previous scores: {scores.slice(1).map(s => s.score).join(', ')}
        </div>
      )}
    </div>
  );
};