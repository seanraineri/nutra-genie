import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BubbleOption } from "../BubbleOption";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const ALLERGY_OPTIONS = [
  "No Allergies",
  "Seasonal",
  "Dairy",
  "Gluten",
  "Shellfish",
  "Nuts",
  "Latex",
] as const;

interface AllergiesStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const AllergiesStep = ({ form }: AllergiesStepProps) => {
  const [otherAllergies, setOtherAllergies] = useState("");
  const allergies = form.watch("allergies") || [];

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    if (allergy === "No Allergies") {
      if (checked) {
        form.setValue("allergies", []);
      }
      return;
    }

    const currentAllergies = form.getValues("allergies") || [];
    if (checked) {
      form.setValue("allergies", [...currentAllergies, allergy]);
    } else {
      form.setValue(
        "allergies",
        currentAllergies.filter((a) => a !== allergy)
      );
    }
  };

  const handleOtherAllergyAdd = () => {
    if (otherAllergies.trim()) {
      const currentAllergies = form.getValues("allergies") || [];
      form.setValue("allergies", [...currentAllergies, otherAllergies.trim()]);
      setOtherAllergies("");
    }
  };

  const handleRemoveAllergy = (allergyToRemove: string) => {
    const currentAllergies = form.getValues("allergies") || [];
    form.setValue(
      "allergies",
      currentAllergies.filter((allergy) => allergy !== allergyToRemove)
    );
  };

  const hasNoAllergies = allergies.length === 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Do you have any allergies?</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <BubbleOption
            label="I don't have any allergies"
            isSelected={hasNoAllergies}
            onClick={() => handleAllergyChange("No Allergies", !hasNoAllergies)}
          />
          
          {!hasNoAllergies && ALLERGY_OPTIONS.slice(1).map((allergy) => (
            <BubbleOption
              key={allergy}
              label={allergy}
              isSelected={allergies.includes(allergy)}
              onClick={() => handleAllergyChange(allergy, !allergies.includes(allergy))}
            />
          ))}
        </div>

        {!hasNoAllergies && (
          <>
            <div className="space-y-2">
              <Label>Other Allergies</Label>
              <div className="flex space-x-2">
                <Input
                  value={otherAllergies}
                  onChange={(e) => setOtherAllergies(e.target.value)}
                  placeholder="Enter other allergy"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleOtherAllergyAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleOtherAllergyAdd}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="allergies"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {allergies.map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {allergy}
                          <button
                            type="button"
                            onClick={() => handleRemoveAllergy(allergy)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};