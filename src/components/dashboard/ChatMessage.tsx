interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  // Function to clean markdown symbols from text
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/#{1,6}\s/g, '') // Remove heading markers
      .replace(/\*\*/g, '')     // Remove bold markers
      .replace(/\*/g, '')       // Remove italic markers
      .replace(/`/g, '')        // Remove code markers
      .trim();
  };

  // Function to convert URLs to clickable links
  const createClickableLinks = (text: string) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    // Split the text into parts (URLs and non-URLs)
    const parts = text.split(urlPattern);
    
    return parts.map((part, index) => {
      if (part.match(urlPattern)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Function to format the content with bullet points and links
  const formatContent = (text: string) => {
    const cleanedText = cleanMarkdown(text);
    return cleanedText.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <li key={index} className="ml-4 mb-2">
            {createClickableLinks(trimmedLine.substring(1).trim())}
          </li>
        );
      }
      return (
        <p key={index} className={trimmedLine ? "mb-2" : "mb-4"}>
          {createClickableLinks(trimmedLine)}
        </p>
      );
    });
  };

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[90%] rounded-lg p-4 ${
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