import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./chat/ChatInput";
import { useHealthChat } from "@/hooks/useHealthChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Bot } from "lucide-react";

const quickReplies = [
  "Analyze my health data",
  "View my supplement plan",
  "Tell me about Vitamin D",
  "Search for magnesium benefits",
  "Check my progress",
  "Update my goals",
  "Set monthly supplement budget",
];

export const HealthAssistant = () => {
  const { chatHistory, isLoading, handleSendMessage } = useHealthChat();
  const [showBudgetInput, setShowBudgetInput] = useState(false);
  const [budget, setBudget] = useState("");
  const { toast } = useToast();

  const handleBudgetUpdate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to set a budget",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_health_profiles')
        .upsert({
          user_id: user.id,
          monthly_supplement_budget: parseFloat(budget)
        });

      if (error) throw error;

      toast({
        title: "Budget Updated",
        description: `Your monthly supplement budget has been set to $${budget}`,
      });

      setShowBudgetInput(false);
      handleSendMessage(`My monthly supplement budget is now $${budget}. Please provide recommendations within this budget.`);
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        title: "Error",
        description: "Failed to update budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "Set monthly supplement budget") {
      setShowBudgetInput(true);
    } else {
      handleSendMessage(reply);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-b from-background to-background/80 shadow-lg animate-fade-in">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-secondary">Health Assistant</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {chatHistory?.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {showBudgetInput && (
            <div className="flex gap-3 items-center p-4 bg-accent/5 rounded-lg border border-accent/20 animate-fade-in">
              <Input
                type="number"
                placeholder="Enter monthly budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="max-w-[200px]"
              />
              <Button 
                onClick={handleBudgetUpdate}
                disabled={!budget || isNaN(parseFloat(budget))}
                className="bg-accent hover:bg-accent/90"
              >
                Set Budget
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowBudgetInput(false)}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-background/50 backdrop-blur-sm">
        <QuickReplies
          replies={quickReplies}
          onSelect={handleQuickReply}
          disabled={isLoading}
        />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
};