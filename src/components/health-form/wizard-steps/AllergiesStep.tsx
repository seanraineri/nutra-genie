import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const ALLERGY_OPTIONS = [
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
  const [hasNoAllergies, setHasNoAllergies] = useState(false);

  const handleNoAllergiesChange = (checked: boolean) => {
    setHasNoAllergies(checked);
    if (checked) {
      form.setValue("allergies", []);
    }
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Do you have any allergies?</h2>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-allergies"
              checked={hasNoAllergies}
              onCheckedChange={(checked) => handleNoAllergiesChange(checked as boolean)}
            />
            <Label htmlFor="no-allergies">I have no allergies</Label>
          </div>
        </div>

        {!hasNoAllergies && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {ALLERGY_OPTIONS.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={allergy}
                    checked={(form.getValues("allergies") || []).includes(allergy)}
                    onCheckedChange={(checked) =>
                      handleAllergyChange(allergy, checked as boolean)
                    }
                  />
                  <Label htmlFor={allergy}>{allergy}</Label>
                </div>
              ))}
            </div>

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
                      {(form.getValues("allergies") || []).map((allergy, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full"
                        >
                          <span>{allergy}</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleAllergyChange(allergy, false)
                            }
                            className="text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        </div>
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