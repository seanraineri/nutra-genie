import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const fetchChatHistory = async () => {
  // For testing, we'll use null instead of a UUID that doesn't exist
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .is('user_id', null)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }

  return data;
};

export const persistMessage = async (message: ChatMessage) => {
  // For testing, we'll use null instead of a UUID that doesn't exist
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
    throw error;
  }
};