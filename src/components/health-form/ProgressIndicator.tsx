import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "progress-dot",
                  index <= currentStep && "active"
                )}
              />
              <span className="mt-2 text-xs text-muted-foreground">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "progress-line mx-2",
                  index < currentStep && "completed"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};