import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MedicalCondition } from "@/types/health-form";

interface MedicalConditionsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

const CONDITIONS = [
  { id: "diabetes", label: "Diabetes", requiresType: true },
  { id: "thyroid", label: "Thyroid Issues", requiresSpecification: true },
  { id: "cholesterol", label: "High Cholesterol" },
  { id: "blood-pressure", label: "High Blood Pressure" },
  { id: "adhd", label: "ADHD" },
  { id: "anxiety-depression", label: "Anxiety or Depression" },
  { id: "ibs", label: "IBS" },
  { id: "arthritis", label: "Arthritis" },
  { id: "cancer", label: "Cancer", requiresSpecification: true },
  { id: "other", label: "Other", requiresSpecification: true },
];

export const MedicalConditionsStep = ({ form }: MedicalConditionsStepProps) => {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [specification, setSpecification] = useState("");
  const [noConditions, setNoConditions] = useState(false);

  const conditions = form.watch("medicalConditions") || [];

  const handleAddCondition = (condition: string, spec?: string) => {
    const newCondition: MedicalCondition = {
      condition,
      specification: spec,
    };
    
    const currentConditions = form.getValues("medicalConditions") || [];
    form.setValue("medicalConditions", [...currentConditions, newCondition]);
    setSelectedCondition(null);
    setSpecification("");
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
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="no-conditions"
            checked={noConditions}
            onCheckedChange={handleNoConditions}
          />
          <Label htmlFor="no-conditions">I don't have any medical conditions</Label>
        </div>

        {!noConditions && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {CONDITIONS.map((condition) => (
                <Dialog key={condition.id}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setSelectedCondition(condition.label)}
                    >
                      {condition.label}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{condition.label}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {condition.requiresType && (
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => handleAddCondition(condition.label, "Type 1")}
                            >
                              Type 1
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleAddCondition(condition.label, "Type 2")}
                            >
                              Type 2
                            </Button>
                          </div>
                        </div>
                      )}
                      {condition.requiresSpecification && (
                        <div className="space-y-2">
                          <Label>Please specify</Label>
                          <Input
                            value={specification}
                            onChange={(e) => setSpecification(e.target.value)}
                            placeholder="Enter details"
                          />
                          <Button
                            className="w-full"
                            onClick={() => handleAddCondition(condition.label, specification)}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                      {!condition.requiresType && !condition.requiresSpecification && (
                        <Button
                          className="w-full"
                          onClick={() => handleAddCondition(condition.label)}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
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
      </div>
    </div>
  );
};