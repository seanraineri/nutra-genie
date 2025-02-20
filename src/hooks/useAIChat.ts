
export const useAIChat = () => {
  const processAIResponse = async (message: string, userId: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, userId }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error processing AI response:', error);
      return "I'm having trouble connecting to the server. Please try again later.";
    }
  };

  return {
    processAIResponse
  };
};
