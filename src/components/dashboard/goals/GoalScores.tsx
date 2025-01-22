import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, TrendingUp, History } from "lucide-react";

interface GoalScoresProps {
  goalId: string;
}

export const GoalScores = ({ goalId }: GoalScoresProps) => {
  // Mock data for visualization
  const currentScore = 75;
  const mockScores = [
    { id: '1', score: 75, created_at: '2024-03-20' },
    { id: '2', score: 60, created_at: '2024-03-19' },
    { id: '3', score: 45, created_at: '2024-03-18' },
    { id: '4', score: 30, created_at: '2024-03-17' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
          <span className="text-3xl font-bold text-primary">{currentScore}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
        <Progress value={currentScore} className="h-3 bg-gray-100" />
      </div>

      {/* Add New Score Section */}
      <div className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          placeholder="Enter score (0-100)"
          className="w-40 bg-white"
        />
        <Button className="bg-primary hover:bg-primary/90">
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
          {mockScores.map((score) => (
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
        </div>
      </div>
    </div>
  );
};