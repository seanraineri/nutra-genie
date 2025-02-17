
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
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AllergiesStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const AllergiesStep = ({ form }: AllergiesStepProps) => {
  const [newAllergy, setNewAllergy] = useState("");
  const allergies = form.watch("allergies") || [];
  const hasNoAllergies = allergies.length === 0;

  const handleAllergyAdd = () => {
    if (newAllergy.trim()) {
      const currentAllergies = form.getValues("allergies") || [];
      form.setValue("allergies", [...currentAllergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (allergyToRemove: string) => {
    const currentAllergies = form.getValues("allergies") || [];
    form.setValue(
      "allergies",
      currentAllergies.filter((allergy) => allergy !== allergyToRemove)
    );
  };

  const handleNoAllergies = () => {
    form.setValue("allergies", []);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Do you have any allergies?</h2>
        
        <Button
          type="button"
          variant={hasNoAllergies ? "default" : "outline"}
          className="w-full h-auto py-6 flex flex-col items-center gap-2 bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white"
          onClick={handleNoAllergies}
        >
          <CheckCircle2 className="h-6 w-6" />
          <span className="text-lg">I don't have any allergies</span>
        </Button>

        {!hasNoAllergies && (
          <>
            <div className="space-y-2">
              <Label>Enter your allergies</Label>
              <div className="flex space-x-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Type your allergy here"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAllergyAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAllergyAdd}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md hover:from-cyan-600 hover:to-teal-600 transition-all"
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
