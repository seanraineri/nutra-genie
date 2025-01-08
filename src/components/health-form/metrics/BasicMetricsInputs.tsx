import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { HealthFormData, Gender } from "@/types/health-form";

interface BasicMetricsInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onGenderChange: (value: Gender) => void;
}

export const BasicMetricsInputs = ({ formData, onChange, onGenderChange }: BasicMetricsInputsProps) => {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Convert cm to feet/inches on component mount
  useEffect(() => {
    if (formData.height) {
      const totalInches = Math.round(Number(formData.height) / 2.54);
      const calculatedFeet = Math.floor(totalInches / 12);
      const calculatedInches = totalInches % 12;
      setFeet(calculatedFeet.toString());
      setInches(calculatedInches.toString());
    }
  }, []);

  // Convert feet/inches to cm when either value changes
  useEffect(() => {
    if (feet || inches) {
      const totalInches = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
      const cm = Math.round(totalInches * 2.54);
      const event = {
        target: {
          id: "height",
          value: cm.toString()
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  }, [feet, inches, onChange]);

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

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Height</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            value={formData.weight}
            onChange={onChange}
            placeholder="Enter weight in lbs"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};