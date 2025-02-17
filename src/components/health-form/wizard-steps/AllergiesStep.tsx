
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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface AllergiesStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const AllergiesStep = ({ form }: AllergiesStepProps) => {
  const [newAllergy, setNewAllergy] = useState("");
  const [noAllergies, setNoAllergies] = useState(false);
  const allergies = form.watch("allergies") || [];

  const handleAllergyAdd = () => {
    if (newAllergy.trim() && !noAllergies) {
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

  const handleNoAllergiesChange = (checked: boolean) => {
    setNoAllergies(checked);
    if (checked) {
      form.setValue("allergies", []);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Do you have any allergies?</h2>

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
            <Button
              type="button"
              onClick={handleAllergyAdd}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600"
            >
              Add
            </Button>
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

        <div className="flex items-center space-x-2 pt-4 mt-4 border-t">
          <Checkbox
            id="noAllergies"
            checked={noAllergies}
            onCheckedChange={handleNoAllergiesChange}
          />
          <Label htmlFor="noAllergies">I don't have any allergies</Label>
        </div>
      </div>
    </div>
  );
};
