export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatHistoryRecord {
  id: string;
  user_id: string | null;
  message: string;
  role: string;
  context: any | null;
  created_at: string | null;
}

export interface QuickReply {
  text: string;
  action: string;
}