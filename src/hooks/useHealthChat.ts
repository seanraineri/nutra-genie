import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types/chat";
import { useAIChat } from "./useAIChat";
import { fetchChatHistory, persistMessage } from "@/api/chatApi";
import { supabase } from "@/integrations/supabase/client";

export const useHealthChat = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
    role: "assistant",
    content: "Hi! I'm your personal health assistant. How can I help!"
  }]);
  const { processAIResponse } = useAIChat();

  useEffect(() => {
    const loadChatHistory = async () => {
      const history = await fetchChatHistory();
      if (history && history.length > 0) {
        setChatHistory(history.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.message
        })));
      }
    };

    loadChatHistory();
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      // For testing, use a temporary user ID
      const tempUserId = 'test-user-id';
      await persistMessage(userMessage);
      const response = await processAIResponse(message, tempUserId);
      
      const assistantMessage: ChatMessage = { role: "assistant", content: response };
      await persistMessage(assistantMessage);
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
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    isLoading,
    handleSendMessage
  };
};