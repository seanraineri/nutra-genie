import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
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
      label: "Manage Conditions",
      description: "Support overall health with existing conditions",
    },
    {
      value: "beauty",
      label: "Beauty & Aesthetics",
      description: "Support skin health and natural beauty",
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
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm">
      <FormField
        control={form.control}
        name="healthGoals"
        render={() => (
          <FormItem>
            <FormLabel className="text-lg font-semibold mb-4">What are your health goals?</FormLabel>
            <FormMessage />
            <div className="grid grid-cols-2 gap-4 mt-6">
              {healthGoalOptions.map((option) => {
                const isSelected = form.getValues("healthGoals")?.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      const current = form.getValues("healthGoals") || [];
                      const updated = isSelected
                        ? current.filter((value) => value !== option.value)
                        : [...current, option.value];
                      form.setValue("healthGoals", updated);
                    }}
                    className={`
                      cursor-pointer rounded-2xl p-4 transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary/10 border-2 border-primary shadow-md transform scale-[1.02]' 
                        : 'bg-gray-50 border-2 border-transparent hover:border-primary/30 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4 mt-8 pt-6 border-t">
        <FormLabel className="text-lg font-semibold">Other Health Goals</FormLabel>
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
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddCustomGoal}
            className="bg-primary hover:bg-primary/90"
          >
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {form.getValues("otherHealthGoals")?.map((goal, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
              <span className="flex-1">{goal}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCustomGoal(index)}
                className="hover:bg-gray-200"
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