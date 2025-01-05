import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "View my supplement plan",
  "Check my progress",
  "Update my goals",
  "Analyze my lab results",
];

export const HealthAssistant = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant. How can I help you today?",
    },
  ]);

  const analyzeLabs = async (labData: any) => {
    try {
      const response = await fetch('/analyze_labs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lab_results: labData
        })
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        return result.recommendations;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error analyzing labs:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage = message;
    setMessage("");

    // Add user message to chat
    setChatHistory(prev => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    try {
      // Check if message is about lab analysis
      if (userMessage.toLowerCase().includes("lab") || 
          userMessage.toLowerCase().includes("results") ||
          userMessage.toLowerCase().includes("analysis")) {
        
        // Mock lab data for demonstration - in real app, this would come from your data store
        const mockLabData = {
          vitaminD: 30,
          b12: 400,
          iron: 80
        };

        const recommendations = await analyzeLabs(mockLabData);
        
        setChatHistory(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: `Based on your lab results analysis:\n${recommendations}`
          }
        ]);
      } else {
        // Default response for non-lab related queries
        setChatHistory(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: "I understand you're asking about " + userMessage + ". How can I help you with that?"
          }
        ]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze lab results. Please try again later.",
        variant: "destructive"
      });
      
      setChatHistory(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I encountered an error while processing your request. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <Button
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={isLoading}
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