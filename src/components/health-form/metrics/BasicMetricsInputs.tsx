
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Gender } from "@/types/health-form";
import { UseFormReturn } from "react-hook-form";
import { healthFormSchema } from "@/schemas/healthFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BasicMetricsInputsProps {
  form: UseFormReturn<typeof healthFormSchema>;
}

export const BasicMetricsInputs = ({ form }: BasicMetricsInputsProps) => {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Convert cm to feet/inches when height value changes
  useEffect(() => {
    const heightValue = form.getValues("height");
    if (heightValue) {
      const totalInches = Math.round(Number(heightValue) / 2.54);
      const calculatedFeet = Math.floor(totalInches / 12);
      const calculatedInches = totalInches % 12;
      setFeet(calculatedFeet.toString());
      setInches(calculatedInches.toString());
    }
  }, [form.getValues("height")]);

  // Convert feet/inches to cm when either value changes
  const updateHeight = (newFeet: string, newInches: string) => {
    const totalInches = (parseInt(newFeet) || 0) * 12 + (parseInt(newInches) || 0);
    const cm = Math.round(totalInches * 2.54);
    form.setValue("height", cm.toString());
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter age" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 space-y-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex space-x-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-center h-10 border-2 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:border-transparent hover:text-white transition-all data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-teal-500 data-[state=checked]:border-transparent data-[state=checked]:text-white">
                        <RadioGroupItem value="male" id="male" className="hidden" />
                        <Label htmlFor="male" className="cursor-pointer text-sm font-medium">Male</Label>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-center h-10 border-2 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:border-transparent hover:text-white transition-all data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-teal-500 data-[state=checked]:border-transparent data-[state=checked]:text-white">
                        <RadioGroupItem value="female" id="female" className="hidden" />
                        <Label htmlFor="female" className="cursor-pointer text-sm font-medium">Female</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Height</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Feet"
                value={feet}
                onChange={(e) => {
                  setFeet(e.target.value);
                  updateHeight(e.target.value, inches);
                }}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Inches"
                value={inches}
                onChange={(e) => {
                  setInches(e.target.value);
                  updateHeight(feet, e.target.value);
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Weight (lbs)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter weight in lbs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
