import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const useHealthChat = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (data && data.length > 0) {
        setChatHistory(data.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content || msg.message // handle both new and old format
        })));
      } else {
        // Set initial greeting if no history exists
        setChatHistory([{
          role: "assistant",
          content: "Hi! I'm your personal health assistant. I can help you understand your supplements and health goals. You can upload holistic health documents to help shape my knowledge and recommendations. What would you like to know about?"
        }]);
      }
    };

    fetchChatHistory();
  }, []);

  const addSupplementRecommendation = async (supplement: {
    supplement_name: string;
    dosage: string;
    reason: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('supplement_recommendations')
        .insert({
          user_id: user.id,
          ...supplement,
          priority: 1,
        });

      if (error) throw error;

      toast({
        title: "Supplement added",
        description: `${supplement.supplement_name} has been added to your supplement plan.`,
      });
    } catch (error: any) {
      console.error('Error adding supplement:', error);
      toast({
        title: "Error",
        description: "Failed to add supplement to your plan.",
        variant: "destructive",
      });
    }
  };

  const addHealthGoal = async (goal: {
    goal_name: string;
    description?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('health_goals')
        .insert({
          user_id: user.id,
          ...goal,
        });

      if (error) throw error;

      toast({
        title: "Goal added",
        description: `${goal.goal_name} has been added to your health goals.`,
      });
    } catch (error: any) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add health goal.",
        variant: "destructive",
      });
    }
  };

  const persistMessage = async (message: ChatMessage) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          message: message.content,
          role: message.role,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error persisting message:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, userMessage]);
    await persistMessage(userMessage);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      if (message.toLowerCase().includes("uploaded a file:")) {
        const filename = message.split("uploaded a file: ")[1];
        const response = `I see you've uploaded ${filename}. I'll analyze this document and incorporate its insights into my knowledge base for providing holistic health recommendations. Is there anything specific you'd like me to focus on from this document?`;
        const assistantMessage: ChatMessage = { role: "assistant", content: response };
        setChatHistory(prev => [...prev, assistantMessage]);
        await persistMessage(assistantMessage);
        setIsLoading(false);
        return;
      }

      console.log('Sending message to search-supplements function:', message);
      
      const { data, error } = await supabase.functions.invoke('search-supplements', {
        body: { 
          query: message,
          userId: user.id
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response from search-supplements:', data);

      if (data.choices && data.choices[0]?.message?.content) {
        const response = data.choices[0].message.content;
        
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
          }
        }

        const assistantMessage: ChatMessage = { role: "assistant", content: response };
        setChatHistory(prev => [...prev, assistantMessage]);
        await persistMessage(assistantMessage);
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