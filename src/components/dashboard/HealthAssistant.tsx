import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";
import { Bot } from "lucide-react";

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
  const { chatHistory, isLoading, handleSendMessage } = useHealthChat();

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-b from-background to-background/80 shadow-lg animate-fade-in">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-secondary">Health Assistant</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-background/50 backdrop-blur-sm">
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