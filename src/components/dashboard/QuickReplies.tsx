import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Search, 
  Pill, 
  BookOpen, 
  LineChart, 
  Target, 
  Wallet,
  LucideIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuickReply {
  text: string;
  category: string;
}

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  disabled?: boolean;
}

const categoryIcons: Record<string, LucideIcon> = {
  analysis: Activity,
  supplements: Pill,
  education: BookOpen,
  search: Search,
  progress: LineChart,
  goals: Target,
  budget: Wallet,
};

export const QuickReplies = ({ replies, onSelect, disabled }: QuickRepliesProps) => {
  return (
    <ScrollArea className="w-full mb-4" type="scroll">
      <div className="flex gap-2">
        <TooltipProvider>
          {replies.map((reply, index) => {
            const Icon = categoryIcons[reply.category] || Search;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(reply)}
                    disabled={disabled}
                    className="bg-white/50 hover:bg-accent/10 border-accent/20 text-secondary hover:text-accent transition-colors animate-fade-in group whitespace-nowrap backdrop-blur-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    {reply.text}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{`Quick access to ${reply.text.toLowerCase()}`}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};