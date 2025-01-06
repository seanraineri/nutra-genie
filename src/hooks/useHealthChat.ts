import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";
import { generateResponse } from "@/utils/healthAssistantResponses";

export const useHealthChat = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant. I can help you analyze lab results, review your supplement plan, track progress, and manage health goals. How can I assist you today?",
    },
  ]);

  const analyzeHealthData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-health-data', {
        body: { message: "Please analyze my health data and provide recommendations" }
      });

      if (error) throw error;
      return data.recommendations;
    } catch (error) {
      console.error('Error analyzing health data:', error);
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: message }]);

    try {
      if (message.toLowerCase().includes("analyze") || 
          message.toLowerCase().includes("recommendations") ||
          message.toLowerCase().includes("health data")) {
        
        const recommendations = await analyzeHealthData();
        const response = generateResponse(message, recommendations);
        
        setChatHistory(prev => [
          ...prev,
          { role: "assistant", content: response || "I've analyzed your health data and generated new recommendations. You can view them in your dashboard." }
        ]);
      } else {
        // For other types of messages, use the default response
        setChatHistory(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: "I understand your question. Let me help you with that. What specific information would you like to know?" 
          }
        ]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again later.",
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

  return {
    chatHistory,
    isLoading,
    handleSendMessage
  };
};