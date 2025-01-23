import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface ActivityLevelStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const ActivityLevelStep = ({ form }: ActivityLevelStepProps) => {
  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little to no regular exercise",
    },
    {
      value: "moderate",
      label: "Moderately Active",
      description: "Light exercise 1-3 times per week",
    },
    {
      value: "active",
      label: "Active",
      description: "Moderate exercise 3-5 times per week",
    },
    {
      value: "athlete",
      label: "Very Active",
      description: "Intense exercise 6-7 times per week",
    },
  ];

  return (
    <FormField
      control={form.control}
      name="activityLevel"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-lg font-semibold">What is your activity level?</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-4">
              {activityLevels.map((level) => {
                const isSelected = field.value === level.value;
                return (
                  <div
                    key={level.value}
                    onClick={() => field.onChange(level.value)}
                    className={`
                      cursor-pointer rounded-xl p-4 transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary/10 border-2 border-primary shadow-md transform scale-[1.02]' 
                        : 'bg-gray-50 border-2 border-transparent hover:border-primary/30 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{level.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {level.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};