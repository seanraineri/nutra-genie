import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";
import { Bot, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const quickReplies = [
  "Analyze my health data",
  "View my supplement plan",
  "Tell me about Vitamin D",
  "Search for magnesium benefits",
  "Check my progress",
  "Update my goals",
  "Set monthly supplement budget",
];

export const HealthAssistant = () => {
  const { chatHistory, isLoading, isTyping, handleSendMessage } = useHealthChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  return (
    <Card className="flex flex-col h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] bg-gradient-to-b from-background to-background/80 shadow-lg animate-fade-in">
      <div className="px-4 py-3 md:p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-secondary">Health Assistant</h2>
        </div>
      </div>

      <ScrollArea 
        className="flex-1 px-4 py-6 md:p-6" 
        ref={scrollAreaRef}
      >
        <div className="space-y-6">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Assistant is typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 md:p-6 border-t bg-background/50 backdrop-blur-sm space-y-4">
        <QuickReplies
          replies={quickReplies}
          onSelect={handleSendMessage}
          disabled={isLoading}
        />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
};