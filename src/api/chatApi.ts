import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const fetchChatHistory = async () => {
  // For testing, use a valid UUID as temporary user ID
  const tempUserId = '00000000-0000-0000-0000-000000000000';

  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', tempUserId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }

  return data;
};

export const persistMessage = async (message: ChatMessage) => {
  // For testing, use a valid UUID as temporary user ID
  const tempUserId = '00000000-0000-0000-0000-000000000000';

  try {
    const { error } = await supabase
      .from('chat_history')
      .insert({
        user_id: tempUserId,
        message: message.content,
        role: message.role,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error persisting message:', error);
    throw error;
  }
};