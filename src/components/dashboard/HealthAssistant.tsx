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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_health_profiles')
        .upsert({
          user_id: user.id,
          monthly_supplement_budget: parseFloat(budget)
        }, {
          onConflict: 'user_id'
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
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Health Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask me anything about your health data, supplements, or upload health-related files
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {showBudgetInput && (
            <div className="flex gap-2 items-center p-4 bg-accent/10 rounded-lg">
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
              >
                Set Budget
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowBudgetInput(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
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