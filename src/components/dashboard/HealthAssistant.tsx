import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";
import { Bot, Loader2, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quickReplies = [
  {
    text: "Analyze my health data",
    category: "analysis",
    description: "Get insights from your health metrics and lab results"
  },
  {
    text: "View my supplement plan",
    category: "supplements",
    description: "Check your personalized supplement recommendations"
  },
  {
    text: "Tell me about Vitamin D",
    category: "education",
    description: "Learn about important nutrients and supplements"
  },
  {
    text: "Search for magnesium benefits",
    category: "search",
    description: "Discover health benefits of specific nutrients"
  }
];

export const HealthAssistant = () => {
  const { chatHistory, isLoading, isTyping, handleSendMessage, clearHistory } = useHealthChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleClearChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      await clearHistory();
      toast({
        title: "Chat history cleared",
        description: "Your conversation has been reset.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear chat history. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-6rem)] bg-white shadow-lg animate-fade-in">
      <div className="px-4 py-3 md:p-6 border-b bg-gradient-to-b from-white to-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Hello, how can I help?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                I'm your personal health assistant
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {chatHistory.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {quickReplies.map((reply, index) => (
            <Card
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
              onClick={() => handleSendMessage(reply.text)}
            >
              <h3 className="font-medium text-secondary group-hover:text-primary transition-colors">
                {reply.text}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {reply.description}
              </p>
            </Card>
          ))}
        </div>
      )}

      <ScrollArea 
        className="flex-1 px-4 py-6 md:p-6" 
        ref={scrollAreaRef}
      >
        <div className="space-y-6 max-w-3xl mx-auto">
          {chatHistory.map((msg, index) => (
            <ChatMessage 
              key={index} 
              role={msg.role} 
              content={msg.content} 
              timestamp={msg.timestamp || new Date().toISOString()}
            />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-base">Assistant is typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 md:p-6 border-t bg-gradient-to-t from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </Card>
  );
};