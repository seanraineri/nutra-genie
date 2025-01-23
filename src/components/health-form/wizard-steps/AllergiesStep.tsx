import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { Label } from "@/components/ui/label";
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

  const handleAllergyChange = (allergy: string) => {
    const currentAllergies = form.getValues("allergies") || [];
    const isSelected = currentAllergies.includes(allergy);
    
    if (isSelected) {
      form.setValue(
        "allergies",
        currentAllergies.filter((a) => a !== allergy)
      );
    } else {
      form.setValue("allergies", [...currentAllergies, allergy]);
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
    <div className="space-y-6 p-6 bg-white rounded-xl">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Do you have any allergies?</h2>
        
        <div className="space-y-2">
          <div 
            className={`
              cursor-pointer rounded-xl p-4 transition-all duration-200
              ${hasNoAllergies 
                ? 'bg-primary/10 border-2 border-primary shadow-md' 
                : 'bg-gray-50 border-2 border-transparent hover:border-primary/30 hover:bg-gray-100'
              }
            `}
            onClick={() => handleNoAllergiesChange(!hasNoAllergies)}
          >
            <Label>I have no allergies</Label>
          </div>
        </div>

        {!hasNoAllergies && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {ALLERGY_OPTIONS.map((allergy) => {
                const isSelected = (form.getValues("allergies") || []).includes(allergy);
                return (
                  <div
                    key={allergy}
                    onClick={() => handleAllergyChange(allergy)}
                    className={`
                      cursor-pointer rounded-xl p-4 transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary/10 border-2 border-primary shadow-md transform scale-[1.02]' 
                        : 'bg-gray-50 border-2 border-transparent hover:border-primary/30 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Label>{allergy}</Label>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t">
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
                            onClick={() => handleAllergyChange(allergy)}
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