import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

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
  ];

  const handleAddCustomGoal = () => {
    if (newGoal.trim()) {
      const currentOtherGoals = form.getValues("otherHealthGoals") || [];
      form.setValue("otherHealthGoals", [...currentOtherGoals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const handleRemoveCustomGoal = (index: number) => {
    const currentOtherGoals = form.getValues("otherHealthGoals") || [];
    form.setValue(
      "otherHealthGoals",
      currentOtherGoals.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="healthGoals"
        render={() => (
          <FormItem>
            <FormLabel className="text-base">What are your health goals?</FormLabel>
            <FormMessage />
            <div className="grid gap-4">
              {healthGoalOptions.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 space-y-0">
                  <Checkbox
                    checked={form.getValues("healthGoals")?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const current = form.getValues("healthGoals") || [];
                      const updated = checked
                        ? [...current, option.value]
                        : current.filter((value) => value !== option.value);
                      form.setValue("healthGoals", updated);
                    }}
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel className="text-base">Other Health Goals</FormLabel>
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
              <span className="flex-1">{goal}</span>
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