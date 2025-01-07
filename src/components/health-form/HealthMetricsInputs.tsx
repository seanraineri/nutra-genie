import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HealthFormData, ActivityLevel } from "@/types/health-form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

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
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Convert feet/inches to centimeters when either value changes
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
          <Label>Height</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                min="0"
                max="8"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                min="0"
                max="11"
                required
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => {
              // Convert pounds to kilograms for storage
              const kg = Math.round(parseFloat(e.target.value) * 0.453592);
              const event = {
                target: {
                  id: "weight",
                  value: kg.toString()
                }
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
            }}
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
          <SelectTrigger className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent className="bg-background border rounded-md shadow-lg min-w-[240px]">
            <SelectItem 
              value="sedentary" 
              className="cursor-pointer px-4 py-2.5 hover:bg-accent/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium">Sedentary</div>
                <div className="text-xs text-muted-foreground">Little to no exercise</div>
              </div>
            </SelectItem>
            <SelectItem 
              value="moderate" 
              className="cursor-pointer px-4 py-2.5 hover:bg-accent/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium">Moderate</div>
                <div className="text-xs text-muted-foreground">Exercise 2-3 times/week</div>
              </div>
            </SelectItem>
            <SelectItem 
              value="active" 
              className="cursor-pointer px-4 py-2.5 hover:bg-accent/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium">Active</div>
                <div className="text-xs text-muted-foreground">Exercise 4-5 times/week</div>
              </div>
            </SelectItem>
            <SelectItem 
              value="athlete" 
              className="cursor-pointer px-4 py-2.5 hover:bg-accent/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium">Athlete</div>
                <div className="text-xs text-muted-foreground">Intense exercise 6+ times/week</div>
              </div>
            </SelectItem>
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