import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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
    content: "Hi! I'm your personal health assistant. How can I help!",
    timestamp: new Date().toISOString()
  }]);

  const { processAIResponse } = useAIChat();

  const clearHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Delete chat history from the database
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      // Reset chat history to initial state
      setChatHistory([{
        role: "assistant",
        content: "Hi! I'm your personal health assistant. How can I help!",
        timestamp: new Date().toISOString()
      }]);

    } catch (error: any) {
      console.error('Failed to clear chat history:', error);
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage: ChatMessage = { 
      role: "user", 
      content: message,
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to use the chat feature');
      }
      
      // Persist user message in background
      persistMessage(userMessage).catch(console.error);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Process AI response with streaming
      const response = await processAIResponse(message, user.id);
      
      const assistantMessage: ChatMessage = { 
        role: "assistant", 
        content: response,
        timestamp: new Date().toISOString()
      };
      // Persist assistant message in background
      persistMessage(assistantMessage).catch(console.error);
      
      setChatHistory(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      toast({
        title: "Error",
        description: error.message || "I'm having trouble processing your request. Please try again.",
        variant: "destructive"
      });
      
      const errorMessage: ChatMessage = { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble accessing the information right now. Please try asking your question again in a moment.",
        timestamp: new Date().toISOString()
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
    handleSendMessage,
    clearHistory
  };
};