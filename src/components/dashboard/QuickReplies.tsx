import { Button } from "@/components/ui/button";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
  disabled?: boolean;
}

export const QuickReplies = ({ replies, onSelect, disabled }: QuickRepliesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {replies.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="bg-background hover:bg-accent/10 border-accent/20 text-secondary hover:text-accent transition-colors animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {reply}
        </Button>
      ))}
    </div>
  );
};