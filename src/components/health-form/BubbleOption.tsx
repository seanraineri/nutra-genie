
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
        "w-full p-4 rounded-xl text-left transition-all duration-200 h-[120px] flex flex-col justify-between",
        "border-2 hover:border-primary/50 hover:bg-primary/5",
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-muted bg-background"
      )}
    >
      <div className="space-y-2">
        <div className="font-medium text-base leading-tight">{label}</div>
        {description && (
          <div className="text-sm text-muted-foreground leading-tight line-clamp-2">{description}</div>
        )}
      </div>
    </button>
  );
};
