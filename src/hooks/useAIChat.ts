
export const useAIChat = () => {
  const processAIResponse = async (message: string, userId: string) => {
    console.log('Mock AI chat processing:', message);
    return "This is a mock AI response. The backend is currently disconnected.";
  };

  return {
    processAIResponse
  };
};
