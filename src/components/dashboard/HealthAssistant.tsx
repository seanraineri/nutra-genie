import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";
import { Loader2, Trash2, Sprout } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quickReplies = [
  {
    text: "Review my supplement plan",
    category: "supplements",
    description: "Check your personalized supplement recommendations"
  },
  {
    text: "Log my daily journal",
    category: "journal",
    description: "Track your daily health and wellness activities"
  },
  {
    text: "Check my health metrics",
    category: "metrics",
    description: "View your latest health data and progress"
  },
  {
    text: "Set new health goals",
    category: "goals",
    description: "Create or update your wellness objectives"
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#1E293B] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#0EA5E9_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#10B981_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#0EA5E9_0%,_transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "4s" }} />
        </div>
      </div>

      <Card className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)] relative z-10 m-6 backdrop-blur-xl bg-white/10 border-[#0EA5E9]/20 shadow-lg animate-fade-in">
        <div className="px-3 py-2 md:p-6 border-b bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-md">
                <Sprout className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] tracking-wide">
                  Welcome to Your Health Journey
                </h2>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear chat</span>
            </Button>
          </div>
        </div>

        {chatHistory.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 md:p-6">
            {quickReplies.map((reply, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden p-3 md:p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-white to-blue-50/50"
                onClick={() => handleSendMessage(reply.text)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-medium text-secondary group-hover:text-primary transition-colors text-sm md:text-base">
                  {reply.text}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {reply.description}
                </p>
              </Card>
            ))}
          </div>
        )}

        <ScrollArea 
          className="flex-1 px-3 py-4 md:p-6" 
          ref={scrollAreaRef}
        >
          <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
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
                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                <span className="text-sm md:text-base">Assistant is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 md:p-6">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </Card>
    </div>
  );
};