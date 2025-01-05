import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

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
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant powered by OpenBioLLM. How can I help you today?",
    },
  ]);

  useEffect(() => {
    const initModel = async () => {
      try {
        const pipe = await pipeline(
          "text-generation",
          "aaditya/Llama3-OpenBioLLM-70B",
          { device: "webgpu" }
        );
        setModel(pipe);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    initModel();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !model) return;
    
    setIsLoading(true);
    const userMessage = { role: "user", content: message };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");

    try {
      const prompt = `You are a helpful health assistant. User asks: ${message}`;
      const result = await model(prompt, {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
      });

      const assistantMessage = {
        role: "assistant",
        content: result[0].generated_text,
      };

      setChatHistory(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Health Assistant</h2>
        <p className="text-sm text-muted-foreground">Powered by OpenBioLLM - Ask me anything about your health data and supplements</p>
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

      <div className="p-4 border-t mt-auto">
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
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={isLoading || !model}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};