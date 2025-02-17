
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { BubbleOption } from "../BubbleOption";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { MedicalCondition } from "@/types/health-form";

interface MedicalConditionsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

const CONDITIONS = [
  { id: "diabetes", label: "Diabetes", requiresType: true },
  { id: "thyroid", label: "Thyroid Issues" },
  { id: "cholesterol", label: "High Cholesterol" },
  { id: "blood-pressure", label: "High Blood Pressure" },
  { id: "adhd", label: "ADHD" },
  { id: "anxiety-depression", label: "Anxiety or Depression" },
  { id: "ibs", label: "IBS" },
  { id: "arthritis", label: "Arthritis" },
  { id: "cancer", label: "Cancer" },
  { id: "other", label: "Other", requiresSpecification: true },
];

export const MedicalConditionsStep = ({ form }: MedicalConditionsStepProps) => {
  const [otherCondition, setOtherCondition] = useState("");
  const [noConditions, setNoConditions] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const conditions = form.watch("medicalConditions") || [];

  const handleAddCondition = (condition: string, spec?: string) => {
    const newCondition: MedicalCondition = {
      condition,
      specification: spec,
    };
    
    const currentConditions = form.getValues("medicalConditions") || [];
    form.setValue("medicalConditions", [...currentConditions, newCondition]);
    setOtherCondition("");
    setDialogOpen(false);
  };

  const handleRemoveCondition = (index: number) => {
    const currentConditions = [...conditions];
    currentConditions.splice(index, 1);
    form.setValue("medicalConditions", currentConditions);
  };

  const handleNoConditions = (checked: boolean) => {
    setNoConditions(checked);
    if (checked) {
      form.setValue("medicalConditions", []);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Do you have any medical conditions?</h2>
        
        {!noConditions && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {CONDITIONS.map((condition) => {
                if (condition.id === "diabetes") {
                  return (
                    <Dialog key={condition.id}>
                      <DialogTrigger asChild>
                        <div>
                          <BubbleOption
                            label={condition.label}
                            isSelected={conditions.some(c => c.condition === "Diabetes")}
                            onClick={() => {}}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Select Diabetes Type</DialogTitle>
                          <DialogDescription>
                            Please select which type of diabetes you have
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <BubbleOption
                            label="Type 1"
                            isSelected={conditions.some(c => c.condition === "Diabetes" && c.specification === "Type 1")}
                            onClick={() => handleAddCondition("Diabetes", "Type 1")}
                          />
                          <BubbleOption
                            label="Type 2"
                            isSelected={conditions.some(c => c.condition === "Diabetes" && c.specification === "Type 2")}
                            onClick={() => handleAddCondition("Diabetes", "Type 2")}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                } else if (condition.requiresSpecification) {
                  return (
                    <Dialog key={condition.id}>
                      <DialogTrigger asChild>
                        <div>
                          <BubbleOption
                            label={condition.label}
                            isSelected={conditions.some(c => c.condition === "Other")}
                            onClick={() => {}}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{condition.label}</DialogTitle>
                          <DialogDescription>
                            Please specify your condition
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Input
                            value={otherCondition}
                            onChange={(e) => setOtherCondition(e.target.value)}
                            placeholder="Enter condition"
                          />
                          <Button
                            className="w-full"
                            onClick={() => handleAddCondition("Other", otherCondition)}
                            disabled={!otherCondition.trim()}
                          >
                            Add
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                }
                
                return (
                  <BubbleOption
                    key={condition.id}
                    label={condition.label}
                    isSelected={conditions.some(c => c.condition === condition.label)}
                    onClick={() => handleAddCondition(condition.label)}
                  />
                );
              })}
            </div>

            <div className="space-y-2">
              <Label>Selected Conditions:</Label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {condition.condition}
                    {condition.specification && ` - ${condition.specification}`}
                    <button
                      onClick={() => handleRemoveCondition(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="pt-4 mt-4 border-t">
          <BubbleOption
            label="I don't have any medical conditions"
            isSelected={noConditions}
            onClick={() => handleNoConditions(!noConditions)}
          />
        </div>
      </div>
    </div>
  );
};
