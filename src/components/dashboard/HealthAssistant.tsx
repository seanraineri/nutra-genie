import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";

const quickReplies = [
  "Analyze my health data",
  "View my supplement plan",
  "Check my progress",
  "Update my goals",
];

export const HealthAssistant = () => {
  const { chatHistory, isLoading, handleSendMessage } = useHealthChat();

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Health Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask me anything about your health data and supplements
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <QuickReplies
          replies={quickReplies}
          onSelect={(reply) => handleSendMessage(reply)}
          disabled={isLoading}
        />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
};