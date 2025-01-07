import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage, ChatHistoryRecord } from "@/types/chat";
import { fetchChatHistory, persistMessage } from "@/api/chatApi";
import { addSupplementRecommendation } from "@/api/supplementApi";
import { addHealthGoal } from "@/api/healthGoalsApi";
import { useAIChat } from "./useAIChat";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useHealthChat = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { processAIResponse } = useAIChat();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
    };

    checkAuth();
    loadChatHistory();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadChatHistory = async () => {
    const data = await fetchChatHistory();
    
    if (data && data.length > 0) {
      const historyRecords = data as ChatHistoryRecord[];
      setChatHistory(historyRecords.map(record => ({
        role: record.role as "user" | "assistant",
        content: record.message
      })));
    } else {
      setChatHistory([{
        role: "assistant",
        content: "Hi! I'm your personal health assistant. How can I help!"
      }]);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to use the chat assistant.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      await persistMessage(userMessage);
      
      if (message.toLowerCase().includes("uploaded a file:")) {
        const filename = message.split("uploaded a file: ")[1];
        const response = `I see you've uploaded ${filename}. I'll analyze this document and incorporate its insights into my knowledge base for providing holistic health recommendations. Is there anything specific you'd like me to focus on from this document?`;
        const assistantMessage: ChatMessage = { role: "assistant", content: response };
        setChatHistory(prev => [...prev, assistantMessage]);
        await persistMessage(assistantMessage);
        return;
      }

      const response = await processAIResponse(message, session.user.id);
      
      // Check if response contains supplement recommendations
      if (response.toLowerCase().includes("recommend") && response.includes("[")) {
        const supplementMatch = response.match(/\[(.*?)\]/g);
        if (supplementMatch) {
          const supplement = supplementMatch[0].replace(/[\[\]]/g, '');
          const dosageMatch = response.match(/Dosage: (.*?)(?=\n|$)/);
          const reasonMatch = response.match(/Benefits: (.*?)(?=\n|$)/);
          
          if (dosageMatch && reasonMatch) {
            await addSupplementRecommendation({
              supplement_name: supplement,
              dosage: dosageMatch[1],
              reason: reasonMatch[1],
            });
            
            toast({
              title: "Supplement added",
              description: `${supplement} has been added to your supplement plan.`,
            });
          }
        }
      }

      // Check if response contains health goals
      if (response.toLowerCase().includes("goal")) {
        const goalMatch = response.match(/goal: (.*?)(?=\n|$)/i);
        if (goalMatch) {
          await addHealthGoal({
            goal_name: goalMatch[1],
            description: "Added via health assistant chat",
          });
          
          toast({
            title: "Goal added",
            description: `New health goal has been added to your plan.`,
          });
        }
      }

      const assistantMessage: ChatMessage = { role: "assistant", content: response };
      setChatHistory(prev => [...prev, assistantMessage]);
      await persistMessage(assistantMessage);

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
      await persistMessage(errorMessage);
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