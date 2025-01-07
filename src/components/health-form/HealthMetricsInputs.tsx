import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { Textarea } from "@/components/ui/textarea";

interface HealthMetricsInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onActivityLevelChange: (value: ActivityLevel) => void;
}

export const HealthMetricsInputs = ({ 
  formData, 
  onChange, 
  onActivityLevelChange 
}: HealthMetricsInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Activity Level</Label>
        <Select
          value={formData.activityLevel}
          onValueChange={(value) => onActivityLevelChange(value as ActivityLevel)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="moderate">2-3 times a week</SelectItem>
            <SelectItem value="active">4-5 times a week</SelectItem>
            <SelectItem value="athlete">Athlete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalConditions">Current Medical Conditions</Label>
        <Textarea
          id="medicalConditions"
          value={formData.medicalConditions}
          onChange={onChange}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={onChange}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};