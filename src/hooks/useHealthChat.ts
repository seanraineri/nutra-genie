import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const useHealthChat = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm your personal health assistant. I can help you understand your supplements and health goals. What would you like to know about?",
    },
  ]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: message }]);

    try {
      // Handle file upload messages
      if (message.toLowerCase().includes("uploaded a file:")) {
        const filename = message.split("uploaded a file: ")[1];
        const response = `I see you've uploaded ${filename}. I'll analyze this file and provide insights based on its contents. Is there anything specific you'd like me to look for in this document?`;
        setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
        setIsLoading(false);
        return;
      }

      console.log('Sending message to search-supplements function:', message);
      
      const { data, error } = await supabase.functions.invoke('search-supplements', {
        body: { query: message }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response from search-supplements:', data);

      if (data.choices && data.choices[0]?.message?.content) {
        const response = data.choices[0].message.content;
        setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
      } else {
        throw new Error('Invalid response format from API');
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      
      toast({
        title: "Error",
        description: "I'm having trouble processing your request. Please try again.",
        variant: "destructive"
      });
      
      setChatHistory(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I'm having trouble accessing the information right now. Please try asking your question again in a moment."
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