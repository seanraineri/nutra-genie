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

  const checkUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Please sign in to use the health assistant");
    }

    // Check if user has a health profile
    const { data: healthProfile } = await supabase
      .from('user_health_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!healthProfile) {
      throw new Error("Please complete your health profile first");
    }

    // Check if user has lab results
    const { data: labResults } = await supabase
      .from('lab_results')
      .select('*')
      .eq('user_id', user.id);

    if (!labResults?.length) {
      throw new Error("Please upload your lab results first");
    }

    return user.id;
  };

  const analyzeHealthData = async () => {
    try {
      const userId = await checkUserProfile();
      
      const { data, error } = await supabase.functions.invoke('analyze-health-data', {
        body: { userId }
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
    } catch (error: any) {
      const errorMessage = error.message || "Failed to process your request. Please try again later.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      setChatHistory(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: `I apologize, but ${errorMessage.toLowerCase()}. Please make sure you have completed your health profile and uploaded your lab results before requesting an analysis.`
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