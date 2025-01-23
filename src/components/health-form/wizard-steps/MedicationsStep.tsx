import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface MedicationsStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const MedicationsStep = ({ form }: MedicationsStepProps) => {
  const [newMedication, setNewMedication] = useState("");
  const currentMedications = form.watch("currentMedications") || [];

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      form.setValue("currentMedications", [...currentMedications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = currentMedications.filter((_, i) => i !== index);
    form.setValue("currentMedications", updatedMedications);
  };

  const handleNoMedications = (checked: boolean) => {
    if (checked) {
      form.setValue("currentMedications", []);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Are you taking any medications?</h3>
        
        <div className="flex gap-2">
          <Input
            placeholder="Enter medication name"
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddMedication();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddMedication}
            disabled={!newMedication.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="noMedications"
            checked={currentMedications.length === 0}
            onCheckedChange={handleNoMedications}
          />
          <Label htmlFor="noMedications">
            I am not currently taking any medications
          </Label>
        </div>

        {currentMedications.length > 0 && (
          <div className="space-y-2 mt-4">
            <h4 className="text-sm font-medium">Current Medications:</h4>
            <ul className="space-y-2">
              {currentMedications.map((medication, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-secondary/10 p-2 rounded"
                >
                  <span>{medication}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMedication(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};