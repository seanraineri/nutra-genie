interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  // Function to clean markdown symbols and citation references from text
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/#{1,6}\s/g, '') // Remove heading markers
      .replace(/\*\*/g, '')     // Remove bold markers
      .replace(/\*/g, '')       // Remove bullet points and italic markers
      .replace(/`/g, '')        // Remove code markers
      .replace(/\[\d+(?:,\s*\d+)*\]/g, '') // Remove citation references like [1] or [1,2,3]
      .trim();
  };

  // Function to convert URLs to clickable links
  const createClickableLinks = (text: string) => {
    // URL pattern that matches text followed by parentheses containing URL
    const linkPattern = /([^(]+)\((https?:\/\/[^\s)]+)\)/g;
    
    // If the text contains link patterns, convert them
    if (text.match(linkPattern)) {
      return text.replace(linkPattern, (match, linkText, url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">${linkText.trim()}</a>`;
      });
    }
    
    // Regular URL pattern for plain URLs
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">${url}</a>`;
    });
  };

  // Function to format the content with bullet points and links
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = cleanMarkdown(line.trim());
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <li 
            key={index} 
            className="ml-4 mb-2"
            dangerouslySetInnerHTML={{
              __html: createClickableLinks(trimmedLine.substring(1).trim())
            }}
          />
        );
      }
      return (
        <p 
          key={index} 
          className={trimmedLine ? "mb-2" : "mb-4"}
          dangerouslySetInnerHTML={{
            __html: createClickableLinks(trimmedLine)
          }}
        />
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