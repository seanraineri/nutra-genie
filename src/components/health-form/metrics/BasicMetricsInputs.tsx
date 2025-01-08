import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HealthFormData, Gender } from "@/types/health-form";

interface BasicMetricsInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onGenderChange: (value: Gender) => void;
}

export const BasicMetricsInputs = ({ formData, onChange, onGenderChange }: BasicMetricsInputsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Enter your age"
            className="w-full"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => onGenderChange(value as Gender)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            value={formData.height}
            onChange={onChange}
            placeholder="Enter height in cm"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            value={formData.weight}
            onChange={onChange}
            placeholder="Enter weight in kg"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};