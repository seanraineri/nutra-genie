import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const HealthGoals = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Improve Sleep Quality</span>
            <span>75%</span>
          </div>
          <Progress value={75} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Boost Energy Levels</span>
            <span>60%</span>
          </div>
          <Progress value={60} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Optimize Vitamin D</span>
            <span>85%</span>
          </div>
          <Progress value={85} />
        </div>
      </div>
    </Card>
  );
};