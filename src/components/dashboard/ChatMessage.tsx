interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\[\d+(?:,\s*\d+)*\]/g, '')
      .trim();
  };

  const createClickableLinks = (text: string) => {
    const linkPattern = /([^(]+)\((https?:\/\/[^\s)]+)\)/g;
    
    if (text.match(linkPattern)) {
      return text.replace(linkPattern, (match, linkText, url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 transition-colors">${linkText.trim()}</a>`;
      });
    }
    
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 transition-colors">${url}</a>`;
    });
  };

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
    <div 
      className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[90%] rounded-lg p-4 shadow-sm ${
          role === "user"
            ? "bg-primary text-primary-foreground ml-12"
            : "bg-card border border-border/50 mr-12"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
};