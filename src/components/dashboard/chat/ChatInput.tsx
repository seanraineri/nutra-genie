
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center gap-2 rounded-2xl bg-[#1A1F2C]/90 backdrop-blur-sm p-2 border border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:bg-gradient-to-r hover:from-[#0EA5E9] hover:to-[#10B981] hover:text-white active:bg-gradient-to-r active:from-[#0EA5E9] active:to-[#10B981] active:text-white transition-all duration-200"
        >
          <PaperclipIcon className="h-5 w-5" />
          <span className="sr-only">Attach file</span>
        </Button>
        
        <Input
          type="text"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-400 text-base"
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
          className={`shrink-0 ${
            message.trim() && !isLoading
              ? "bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:from-[#0EA5E9]/90 hover:to-[#10B981]/90"
              : "bg-muted/50 hover:bg-muted/60"
          } text-white rounded-xl transition-all duration-200`}
        >
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};
