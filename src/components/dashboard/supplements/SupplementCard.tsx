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
      className={`group relative overflow-hidden transition-all duration-1000 hover:scale-[1.02] ${
        isHovered ? 'shadow-[0_0_30px_rgba(14,165,233,0.3)]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-[#10B981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-xl bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-sm text-[#0EA5E9]/80">{dosage}</p>
          </div>
          {imageUrl && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/20 to-[#10B981]/20 group-hover:opacity-50 transition-opacity duration-1000" />
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          )}
        </div>

        <p className="text-sm mb-4 text-gray-200/80">{reason}</p>

        <div className="flex items-center gap-2 text-sm text-[#0EA5E9] mb-4">
          <DollarSign className="w-4 h-4" />
          <span>${cost}/month</span>
        </div>

        <div className="space-y-2">
          {productUrl && (
            <Button 
              variant="outline" 
              className="w-full bg-transparent border border-[#0EA5E9]/50 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-500"
              onClick={() => window.open(productUrl, '_blank')}
            >
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                View Product
              </span>
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border border-[#0EA5E9]/50 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-500"
              onClick={() => submitFeedback(true, true)}
              disabled={isSubmitting}
            >
              <ThumbsUp className="w-4 h-4 mr-2 text-[#0EA5E9]" />
              <span className="text-[#0EA5E9]">Helpful</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border border-[#0EA5E9]/50 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-500"
              onClick={() => submitFeedback(false, false)}
              disabled={isSubmitting}
            >
              <ThumbsDown className="w-4 h-4 mr-2 text-[#0EA5E9]" />
              <span className="text-[#0EA5E9]">Not Helpful</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};