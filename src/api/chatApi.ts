import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/types/chat";

export const fetchChatHistory = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }

  return data;
};

export const persistMessage = async (message: ChatMessage) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
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
    throw error;
  }
};