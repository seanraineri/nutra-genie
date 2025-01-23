import { cn } from "@/lib/utils";

interface BubbleOptionProps {
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}

export const BubbleOption = ({
  label,
  description,
  isSelected,
  onClick,
}: BubbleOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all duration-200",
        "border-2 hover:border-primary/50 hover:bg-primary/5",
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-muted bg-background"
      )}
    >
      <div className="space-y-1">
        <div className="font-medium">{label}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </button>
  );
};