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
    category: "analysis"
  },
  {
    text: "View my supplement plan",
    category: "supplements"
  },
  {
    text: "Tell me about Vitamin D",
    category: "education"
  },
  {
    text: "Search for magnesium benefits",
    category: "search"
  },
  {
    text: "Check my progress",
    category: "progress"
  },
  {
    text: "Update my goals",
    category: "goals"
  },
  {
    text: "Set monthly supplement budget",
    category: "budget"
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
    <Card className="flex flex-col h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] bg-gradient-to-b from-cyan-50/50 to-mint-50/30 shadow-lg animate-fade-in">
      <div className="px-4 py-3 md:p-6 border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-secondary">Health Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      <ScrollArea 
        className="flex-1 px-4 py-6 md:p-6 text-base md:text-lg bg-gradient-to-b from-cyan-50/30 to-mint-50/20" 
        ref={scrollAreaRef}
      >
        <div className="space-y-6">
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

      <div className="p-4 md:p-6 border-t bg-white/50 backdrop-blur-sm space-y-4">
        <QuickReplies
          replies={quickReplies}
          onSelect={(reply) => handleSendMessage(reply.text)}
          disabled={isLoading}
        />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
};