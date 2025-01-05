export const generateResponse = (message: string, recommendations?: string) => {
  // Lab analysis specific response
  if (recommendations) {
    return `Based on your lab results analysis, here are my recommendations:\n${recommendations}\n\nWould you like me to explain any of these findings in more detail?`;
  }

  // Check message content and return appropriate response
  if (message.toLowerCase().includes('supplement')) {
    return "I'll help you review your supplement plan. I can show you your current supplements, suggest adjustments based on your health goals, or explain the benefits of specific supplements. What would you like to know?";
  }

  if (message.toLowerCase().includes('progress')) {
    return "Let me check your health progress. I can show you trends in your metrics, compare them to your goals, and suggest areas for improvement. Which aspect would you like to focus on?";
  }

  if (message.toLowerCase().includes('goals')) {
    return "I'll help you with your health goals. We can review your current goals, update them based on your progress, or set new ones. What would you like to do?";
  }

  // Default response for other queries
  return "I understand you're interested in " + message.toLowerCase().replace(/[?!.]/g, '') + ". Could you tell me more about your specific concerns or questions about this topic?";
};