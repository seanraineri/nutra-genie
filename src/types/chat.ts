export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface QuickReply {
  text: string;
  action: string;
}