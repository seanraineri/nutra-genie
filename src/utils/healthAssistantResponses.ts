export const generateResponse = (message: string, recommendations?: string) => {
  // Lab analysis specific response
  if (recommendations) {
    return `Based on your lab results analysis:\n${recommendations}\n\nWould you like me to explain any of these findings in more detail?`;
  }

  // Check message content and return appropriate response
  if (message.toLowerCase().includes('supplement')) {
    return "I can help you review your supplement plan. I can show you your current supplements, suggest adjustments based on your health goals, or explain the benefits of specific supplements. What interests you most?";
  }

  if (message.toLowerCase().includes('progress')) {
    return "I'd be happy to review your health progress. We can look at your metrics trends, compare them to your goals, and identify areas where you're excelling or might need additional focus. Which aspect would you like to explore?";
  }

  if (message.toLowerCase().includes('goals')) {
    return "Let's discuss your health goals. We can review your current objectives, track your progress, or set new targets based on your journey. What would you like to focus on?";
  }

  // Default response for other queries
  return "I understand you're interested in improving your health. Could you tell me more about your specific health goals or concerns?";
};