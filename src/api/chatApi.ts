
import { ChatMessage } from "@/types/chat";

export const fetchChatHistory = async (shouldFetch: boolean = true) => {
  if (!shouldFetch) return [];
  return [];
};

export const persistMessage = async (message: ChatMessage) => {
  console.log('Mock persisting message:', message);
};
