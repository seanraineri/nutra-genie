import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        placeholder="Ask me anything about your health journey..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        disabled={isLoading}
        className="bg-white/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
      />
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !message.trim()}
        size="icon"
        className="shrink-0 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md animate-button-glow disabled:animate-none"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};