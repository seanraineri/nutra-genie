import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
  disabled?: boolean;
}

export const QuickReplies = ({ replies, onSelect, disabled }: QuickRepliesProps) => {
  return (
    <ScrollArea className="w-full mb-4" type="scroll">
      <div className="flex gap-2">
        {replies.map((reply, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(reply)}
            disabled={disabled}
            className="bg-background hover:bg-accent/10 border-accent/20 text-secondary hover:text-accent transition-colors animate-fade-in whitespace-nowrap"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {reply}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};