
import { cn } from "@/lib/utils";

interface BubbleOptionProps {
  label: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const BubbleOption = ({
  label,
  description,
  isSelected,
  onClick,
  className,
}: BubbleOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-200 h-[100px] sm:h-[120px] flex flex-col justify-between",
        "border-2 hover:border-primary/50 hover:bg-primary/5",
        "active:bg-gradient-to-r active:from-[#0EA5E9] active:to-[#10B981] active:text-white",
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-muted bg-background",
        className
      )}
    >
      <div className="space-y-1.5 sm:space-y-2">
        <div className="font-medium text-sm sm:text-base leading-tight">{label}</div>
        {description && (
          <div className="text-xs sm:text-sm text-muted-foreground leading-tight line-clamp-2">{description}</div>
        )}
      </div>
    </button>
  );
};
