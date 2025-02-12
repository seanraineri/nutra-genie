
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
      description: "Discover personalized strategies to reach your ideal weight and boost your confidence, tailored to your lifestyle.",
    },
    {
      value: "energy_focus",
      label: "Energy & Focus",
      description: "Fuel your day with sustained energy and sharp mental clarity—designed just for you.",
    },
    {
      value: "immune_support",
      label: "Immune Support",
      description: "Empower your body's natural defenses with targeted, nutrient-rich support that keeps you resilient.",
    },
    {
      value: "sleep_stress",
      label: "Sleep & Stress",
      description: "Experience deeper, restorative sleep and effective stress management with a plan that fits your unique needs.",
    },
    {
      value: "fitness_performance",
      label: "Fitness Performance",
      description: "Elevate your workouts and accelerate recovery with personalized guidance to help you reach new heights.",
    },
    {
      value: "mental_health",
      label: "Mental Health",
      description: "Enhance your cognitive function and emotional balance with tailored support for a clearer, happier mind.",
    },
    {
      value: "hormone_balance",
      label: "Hormone Balance",
      description: "Naturally optimize your hormone levels to restore balance and boost your overall vitality.",
    },
    {
      value: "longevity",
      label: "Longevity",
      description: "Support healthy aging and nourish your cells with a plan designed to keep you feeling youthful and energetic.",
    },
    {
      value: "chronic_conditions",
      label: "Manage Chronic Conditions",
      description: "Take control of your health with personalized support for managing chronic conditions and enhancing overall well-being.",
    },
    {
      value: "beauty",
      label: "Beauty & Aesthetics",
      description: "Reveal your natural radiance by nourishing your skin from within, using personalized, clean formulas.",
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
            <div className="grid grid-cols-2 gap-4">
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
        <div className="flex gap-2">
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
          <Button type="button" onClick={handleAddCustomGoal}>
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {form.getValues("otherHealthGoals")?.map((goal, index) => (
            <div key={index} className="flex items-center gap-2 bg-secondary/20 p-2 rounded-md">
              <span>{goal}</span>
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
