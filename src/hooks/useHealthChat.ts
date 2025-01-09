import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types/chat";
import { useAIChat } from "./useAIChat";
import { fetchChatHistory, persistMessage } from "@/api/chatApi";
import { supabase } from "@/integrations/supabase/client";

export const useHealthChat = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
    role: "assistant",
    content: "Hi! I'm your personal health assistant. How can I help!"
  }]);
  const { processAIResponse } = useAIChat();

  useEffect(() => {
    // Initialize with just the welcome message, don't fetch history
    setChatHistory([{
      role: "assistant",
      content: "Hi! I'm your personal health assistant. How can I help!"
    }]);
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;
      
      // Persist user message in background
      persistMessage(userMessage).catch(console.error);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Process AI response with streaming
      const response = await processAIResponse(message, userId || '');
      
      const assistantMessage: ChatMessage = { role: "assistant", content: response };
      // Persist assistant message in background
      persistMessage(assistantMessage).catch(console.error);
      
      setChatHistory(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      toast({
        title: "Error",
        description: "I'm having trouble processing your request. Please try again.",
        variant: "destructive"
      });
      
      const errorMessage: ChatMessage = { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble accessing the information right now. Please try asking your question again in a moment."
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    isLoading,
    isTyping,
    handleSendMessage
  };
};