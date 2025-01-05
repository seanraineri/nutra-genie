export const generateResponse = (message: string, recommendations?: string) => {
  // Only handle lab analysis case, pass through all other responses
  if (recommendations) {
    return recommendations;
  }

  // Return empty string to allow model response to be used directly
  return "";
};