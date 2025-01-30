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
  const [isHovered, setIsHovered] = useState(false);

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
          budgetFit: true,
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
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
        isHovered ? 'shadow-[0_0_30px_rgba(139,92,246,0.3)]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-[#D946EF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-orbitron text-xl bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-sm text-[#8B5CF6]/80">{dosage}</p>
          </div>
          {imageUrl && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 to-[#D946EF]/20 group-hover:opacity-50 transition-opacity duration-500" />
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}
        </div>

        <p className="text-sm mb-4 text-gray-200/80">{reason}</p>

        <div className="flex items-center gap-2 text-sm text-[#8B5CF6] mb-4">
          <DollarSign className="w-4 h-4" />
          <span>${cost}/month</span>
        </div>

        <div className="space-y-2">
          {productUrl && (
            <Button 
              variant="outline" 
              className="w-full bg-transparent border border-[#8B5CF6]/50 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-300"
              onClick={() => window.open(productUrl, '_blank')}
            >
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                View Product
              </span>
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border border-[#8B5CF6]/50 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-300"
              onClick={() => submitFeedback(true, true)}
              disabled={isSubmitting}
            >
              <ThumbsUp className="w-4 h-4 mr-2 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6]">Helpful</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border border-[#8B5CF6]/50 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-300"
              onClick={() => submitFeedback(false, false)}
              disabled={isSubmitting}
            >
              <ThumbsDown className="w-4 h-4 mr-2 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6]">Not Helpful</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};