
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BubbleOption } from "../BubbleOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";

interface HealthGoalsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const HealthGoalsStep = ({ form }: HealthGoalsStepProps) => {
  const [newGoal, setNewGoal] = useState("");
  const healthGoalOptions = [
    {
      value: "weight_management",
      label: "Weight Management",
      description: "Discover your path to a healthier weight.",
    },
    {
      value: "energy_focus",
      label: "Energy & Focus",
      description: "Unlock lasting energy and clarity.",
    },
    {
      value: "immune_support",
      label: "Immune Support",
      description: "Fortify your natural defenses today.",
    },
    {
      value: "sleep_stress",
      label: "Sleep & Stress",
      description: "Enjoy deeper sleep and a calmer mind.",
    },
    {
      value: "fitness_performance",
      label: "Fitness Performance",
      description: "Push your limits and recover faster.",
    },
    {
      value: "mental_health",
      label: "Mental Health",
      description: "Elevate your mood and sharpen your focus.",
    },
    {
      value: "hormone_balance",
      label: "Hormone Balance",
      description: "Restore harmony for vibrant living.",
    },
    {
      value: "longevity",
      label: "Longevity",
      description: "Invest in your youthful vitality.",
    },
    {
      value: "chronic_conditions",
      label: "Manage Chronic Conditions",
      description: "Take control with tailored, proactive care.",
    },
    {
      value: "beauty",
      label: "Beauty & Aesthetics",
      description: "Enhance your natural radiance from within.",
    },
  ];

  const handleAddCustomGoal = () => {
    if (newGoal.trim()) {
      const currentGoals = form.getValues("otherHealthGoals") || [];
      form.setValue("otherHealthGoals", [...currentGoals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const handleRemoveCustomGoal = (index: number) => {
    const currentGoals = form.getValues("otherHealthGoals") || [];
    form.setValue(
      "otherHealthGoals",
      currentGoals.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="healthGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What are your health goals?</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {healthGoalOptions.map((option) => (
                <BubbleOption
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  isSelected={(field.value || []).includes(option.value)}
                  onClick={() => {
                    const current = field.value || [];
                    const updated = current.includes(option.value)
                      ? current.filter((value) => value !== option.value)
                      : [...current, option.value];
                    field.onChange(updated);
                  }}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4 pt-4 border-t">
        <FormLabel>Other Health Goals</FormLabel>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter a custom health goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomGoal();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={handleAddCustomGoal}
            className="w-full sm:w-auto"
          >
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {form.getValues("otherHealthGoals")?.map((goal, index) => (
            <div key={index} className="flex items-center gap-2 bg-secondary/20 p-2 rounded-md">
              <span className="flex-1 break-words">{goal}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCustomGoal(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
