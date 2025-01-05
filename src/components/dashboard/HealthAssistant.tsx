import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "View my supplement plan",
  "Check my progress",
  "Update my goals",
  "Side effects",
];

export const HealthAssistant = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant. How can I help you today?",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: "I'll help you with that! (This is a mock response)" },
    ]);
    setMessage("");
  };

  return (
    <Card className="flex flex-col h-[800px]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Health Assistant</h2>
        <p className="text-sm text-muted-foreground">Ask me anything about your health data and supplements</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setMessage(reply);
              }}
            >
              {reply}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="shrink-0"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};