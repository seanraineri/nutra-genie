import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivityLevel } from "@/types/health-form";

interface ActivityLevelSelectProps {
  value: ActivityLevel;
  onValueChange: (value: ActivityLevel) => void;
}

export const ActivityLevelSelect = ({ value, onValueChange }: ActivityLevelSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="activityLevel">Activity Level</Label>
      <Select
        value={value}
        onValueChange={(value) => onValueChange(value as ActivityLevel)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your activity level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sedentary" className="py-3 cursor-pointer">
            <div className="space-y-1">
              <div className="font-medium">Sedentary</div>
              <div className="text-sm text-muted-foreground">Little to no exercise</div>
            </div>
          </SelectItem>
          <SelectItem value="moderate" className="py-3 cursor-pointer">
            <div className="space-y-1">
              <div className="font-medium">Moderate</div>
              <div className="text-sm text-muted-foreground">Exercise 2-3 times/week</div>
            </div>
          </SelectItem>
          <SelectItem value="active" className="py-3 cursor-pointer">
            <div className="space-y-1">
              <div className="font-medium">Active</div>
              <div className="text-sm text-muted-foreground">Exercise 4-5 times/week</div>
            </div>
          </SelectItem>
          <SelectItem value="athlete" className="py-3 cursor-pointer">
            <div className="space-y-1">
              <div className="font-medium">Athlete</div>
              <div className="text-sm text-muted-foreground">Intense exercise 6+ times/week</div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};