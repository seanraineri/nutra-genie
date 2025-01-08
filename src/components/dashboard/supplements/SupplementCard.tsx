import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SupplementCardProps {
  id: string;
  name: string;
  dosage: string;
  reason: string;
  cost: number;
  companyName?: string;
  productUrl?: string;
  imageUrl?: string;
}

export const SupplementCard = ({
  id,
  name,
  dosage,
  reason,
  cost,
  companyName,
  productUrl,
  imageUrl
}: SupplementCardProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async (isHelpful: boolean, followedRecommendation: boolean) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.functions.invoke('track-ai-metrics', {
        body: {
          userId: user.id,
          recommendationId: id,
          isHelpful,
          followedRecommendation,
          budgetFit: true, // User can afford it since it's in their plan
          feedback: `User ${isHelpful ? 'found' : 'did not find'} the recommendation helpful`,
        }
      });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our recommendations.",
      });

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{dosage}</p>
        </div>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
      </div>

      <p className="text-sm mb-4">{reason}</p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <DollarSign className="w-4 h-4" />
        <span>${cost}/month</span>
      </div>

      <div className="mt-auto space-y-2">
        {productUrl && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(productUrl, '_blank')}
          >
            View Product
          </Button>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => submitFeedback(true, true)}
            disabled={isSubmitting}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Helpful
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => submitFeedback(false, false)}
            disabled={isSubmitting}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Not Helpful
          </Button>
        </div>
      </div>
    </Card>
  );
};