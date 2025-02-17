
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
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
    const markdownLinkPattern = /\[(.*?)\]\((.*?)\)/g;
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    let processedText = text.replace(markdownLinkPattern, (match, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 transition-colors">${linkText.trim()}</a>`;
    });
    
    processedText = processedText.replace(urlPattern, (url) => {
      if (!url.includes('</a>')) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80 transition-colors">${url}</a>`;
      }
      return url;
    });
    
    return processedText;
  };

  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = cleanMarkdown(line);
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
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4 animate-fade-in group`}>
      <div className={`flex gap-3 max-w-[85%] ${role === "user" ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar className="h-8 w-8 shrink-0">
          {role === "user" ? (
            <>
              <AvatarImage src="/lovable-uploads/151ff454-649a-4fcb-8142-f989d5ebebde.png" />
              <AvatarFallback className="bg-gradient-to-br from-[#0EA5E9] to-[#10B981] text-white">U</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/lovable-uploads/15cb73cf-57ff-4716-a01d-e8548a470723.png" />
              <AvatarFallback className="bg-gradient-to-br from-[#0EA5E9] to-[#10B981] text-white">AI</AvatarFallback>
            </>
          )}
        </Avatar>
        <div>
          <div
            className={`rounded-2xl px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-md ${
              role === "user"
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-gradient-to-r from-gray-50 to-blue-50/50"
            }`}
          >
            <div className="prose prose-sm max-w-none">
              {formatContent(content)}
            </div>
          </div>
          <div className="px-2 mt-1">
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {format(new Date(timestamp), "h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
