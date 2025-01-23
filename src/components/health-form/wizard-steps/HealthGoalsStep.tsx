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
      description: "Support healthy weight goals",
    },
    {
      value: "energy_focus",
      label: "Energy & Focus",
      description: "Improve daily energy levels and mental clarity",
    },
    {
      value: "immune_support",
      label: "Immune Support",
      description: "Strengthen immune system function",
    },
    {
      value: "sleep_stress",
      label: "Sleep & Stress",
      description: "Better sleep quality and stress management",
    },
    {
      value: "fitness_performance",
      label: "Fitness Performance",
      description: "Enhance workout results and recovery",
    },
    {
      value: "mental_health",
      label: "Mental Health",
      description: "Support cognitive function and emotional well-being",
    },
    {
      value: "hormone_balance",
      label: "Hormone Balance",
      description: "Optimize hormone levels naturally",
    },
    {
      value: "longevity",
      label: "Longevity",
      description: "Support healthy aging and cellular health",
    },
    {
      value: "chronic_conditions",
      label: "Manage Chronic Conditions",
      description: "Support overall health with existing conditions",
    },
    {
      value: "beauty",
      label: "Beauty & Aesthetics",
      description: "Support skin health and natural beauty from within",
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