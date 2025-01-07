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
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select your activity level" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectItem 
            value="sedentary" 
            className="py-3 px-2 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 rounded-md"
          >
            <div className="space-y-1">
              <div className="font-medium">Sedentary</div>
              <div className="text-sm text-muted-foreground">Little to no regular exercise</div>
            </div>
          </SelectItem>
          <SelectItem 
            value="moderate" 
            className="py-3 px-2 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 rounded-md"
          >
            <div className="space-y-1">
              <div className="font-medium">Moderately Active</div>
              <div className="text-sm text-muted-foreground">Light exercise 2-3 times per week</div>
            </div>
          </SelectItem>
          <SelectItem 
            value="active" 
            className="py-3 px-2 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 rounded-md"
          >
            <div className="space-y-1">
              <div className="font-medium">Active</div>
              <div className="text-sm text-muted-foreground">Moderate exercise 4-5 times per week</div>
            </div>
          </SelectItem>
          <SelectItem 
            value="athlete" 
            className="py-3 px-2 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 rounded-md"
          >
            <div className="space-y-1">
              <div className="font-medium">Very Active</div>
              <div className="text-sm text-muted-foreground">Intense exercise 6+ times per week</div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};