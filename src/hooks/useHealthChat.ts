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
      content: "Hi! I'm your personal health assistant. I can help you understand your lab results, manage your supplement plan, and track your health goals. You can also ask me about specific supplements or share health-related files with me for analysis. What would you like to know about?",
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

  const handleFileUpload = async (filename: string) => {
    try {
      const response = `I see you've uploaded ${filename}. I'll analyze this file and provide insights based on its contents. Is there anything specific you'd like me to look for in this document?`;
      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw error;
    }
  };

  const searchSupplements = async (query: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('search-supplements', {
        body: { query }
      });

      if (error) throw error;

      const response = data.choices[0]?.message?.content || 
        "I couldn't find specific information about that supplement. Would you like me to search for something else?";

      return response;
    } catch (error) {
      console.error('Error searching supplements:', error);
      throw error;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: message }]);

    try {
      let response: string;
      
      if (message.toLowerCase().includes("uploaded a file:")) {
        const filename = message.split("uploaded a file: ")[1];
        await handleFileUpload(filename);
        setIsLoading(false);
        return;
      }

      // Check if the message is asking about supplements
      if (message.toLowerCase().includes("supplement") || 
          message.toLowerCase().includes("vitamin") ||
          message.toLowerCase().includes("mineral")) {
        response = await searchSupplements(message);
      } else if (message.toLowerCase().includes("analyze") || 
                 message.toLowerCase().includes("health data")) {
        const recommendations = await analyzeHealthData();
        response = generateResponse(message, recommendations);
      } else {
        response = generateResponse(message);
      }

      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error: any) {
      const errorMessage = error.message || "I'm having trouble accessing that information right now. Could you try again in a moment?";
      
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
