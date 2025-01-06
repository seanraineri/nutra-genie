interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  // Function to format the content with bullet points
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <li key={index} className="ml-4 mb-2">
            {trimmedLine.substring(1).trim()}
          </li>
        );
      }
      return (
        <p key={index} className={trimmedLine ? "mb-2" : "mb-4"}>
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
};