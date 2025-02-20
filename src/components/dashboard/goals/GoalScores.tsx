import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, TrendingUp, History } from "lucide-react";
import { client } from "@/integrations/supabase/client";
import { addGoalScore } from "@/api/healthGoalsApi";
import { useToast } from "@/hooks/use-toast";

interface GoalScore {
  id: string;
  score: number;
  created_at: string;
  notes?: string;
}

interface GoalScoresProps {
  goalId: string;
}

export const GoalScores = ({ goalId }: GoalScoresProps) => {
  const [scores, setScores] = useState<GoalScore[]>([]);
  const [newScore, setNewScore] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchScores = async () => {
    try {
      const response = await client.get(`/api/goals/${goalId}/scores`);
      setScores(response.data || []);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchScores();

    // Set up WebSocket connection for real-time updates if needed
    // This would need to be implemented on your FastAPI backend
  }, [goalId]);

  const handleAddScore = async () => {
    if (!newScore || isNaN(Number(newScore))) {
      toast({
        title: "Invalid score",
        description: "Please enter a valid number between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    const scoreValue = Number(newScore);
    if (scoreValue < 0 || scoreValue > 100) {
      toast({
        title: "Invalid score range",
        description: "Score must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await addGoalScore(goalId, scoreValue);
      setNewScore("");
      toast({
        title: "Score added",
        description: "Your progress has been recorded successfully.",
      });
      fetchScores();
    } catch (error) {
      console.error('Error adding score:', error);
      toast({
        title: "Error",
        description: "Failed to add score. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCurrentScore = () => {
    return scores.length > 0 ? scores[0].score : 0;
  };

  return (
    <div className="space-y-6">
      {/* Current Score Section */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-secondary">Current Score</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl font-bold text-primary">{getCurrentScore()}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
        <Progress value={getCurrentScore()} className="h-3 bg-gray-100" />
      </div>

      {/* Add New Score Section */}
      <div className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          placeholder="Enter score (0-100)"
          className="w-40 bg-white"
          min="0"
          max="100"
        />
        <Button 
          onClick={handleAddScore} 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          Add Score
        </Button>
      </div>

      {/* Score History Section */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-muted-foreground" />
          <h5 className="text-sm font-medium text-secondary">Score History</h5>
        </div>
        <div className="space-y-3">
          {scores.map((score) => (
            <div 
              key={score.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary"
                  className="h-8 w-8 rounded-full flex items-center justify-center font-medium"
                >
                  {score.score}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDate(score.created_at)}
                </span>
              </div>
              <Progress value={score.score} className="w-24 h-2" />
            </div>
          ))}
          {scores.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No scores recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
