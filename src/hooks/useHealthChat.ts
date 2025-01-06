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
      content: "Hi! I'm your personal health assistant. I can help you understand your lab results, manage your supplement plan, and track your health goals. What would you like to know about?",
    },
  ]);

  const checkUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Please sign in to continue our conversation");
    }

    const { data: healthProfile } = await supabase
      .from('user_health_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!healthProfile) {
      throw new Error("I notice you haven't completed your health profile yet. Would you like me to guide you through setting that up?");
    }

    const { data: labResults } = await supabase
      .from('lab_results')
      .select('*')
      .eq('user_id', user.id);

    if (!labResults?.length) {
      throw new Error("I see that we don't have your lab results yet. Would you like to know how to upload them?");
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
      let response: string;
      
      if (message.toLowerCase().includes("analyze") || 
          message.toLowerCase().includes("health data")) {
        
        const recommendations = await analyzeHealthData();
        response = generateResponse(message, recommendations);
      } else {
        response = generateResponse(message);
      }

      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error: any) {
      const errorMessage = error.message || "I'm having trouble accessing your health information right now. Could you try again in a moment?";
      
      toast({
        title: "Notice",
        description: errorMessage,
        variant: "default"
      });
      
      setChatHistory(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: errorMessage
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