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
        >
          {reply}
        </Button>
      ))}
    </div>
  );
};