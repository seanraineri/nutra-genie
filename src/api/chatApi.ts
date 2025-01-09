import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const fetchChatHistory = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .is('user_id', null)
    .order('created_at', { ascending: true })
    .limit(50); // Limit the number of messages to improve performance

  if (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }

  return data;
};

export const persistMessage = async (message: ChatMessage) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  try {
    const { error } = await supabase
      .from('chat_history')
      .insert({
        user_id: userId,
        message: message.content,
        role: message.role,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error persisting message:', error);
    // Don't throw the error to prevent blocking the chat flow
  }
};