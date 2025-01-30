import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Supplement } from "@/types/supplements";
import { SupplementsGrid } from "./supplements/SupplementsGrid";
import { useToast } from "@/components/ui/use-toast";

export const SupplementPlan = () => {
  const [recommendations, setRecommendations] = useState<Supplement[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSupplements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('supplement_recommendations')
        .select('id, supplement_name, dosage, reason, company_name, product_url, image_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching supplements:', error);
        return;
      }

      setRecommendations(data || []);
    };

    fetchSupplements();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'supplement_recommendations'
        },
        () => {
          fetchSupplements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Supplement Plan',
        text: 'Check out my personalized supplement plan!',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support sharing functionality.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#2A1F3C] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#8B5CF6_0%,_transparent_50%)] animate-pulse" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#D946EF_0%,_transparent_50%)] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#0EA5E9_0%,_transparent_50%)] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <Card className="relative z-10 m-6 backdrop-blur-xl bg-white/10 border-[#8B5CF6]/20 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-orbitron bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#0EA5E9] bg-clip-text text-transparent animate-text-shimmer">
              Your Carnival of Supplements
            </h2>
            <Button
              variant="outline"
              onClick={handleShare}
              className="group relative overflow-hidden bg-transparent border border-[#8B5CF6]/50 hover:border-[#8B5CF6] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Share className="w-4 h-4 mr-2 text-[#8B5CF6] group-hover:text-[#D946EF] transition-colors duration-300" />
              <span className="text-[#8B5CF6] group-hover:text-[#D946EF] transition-colors duration-300">
                Share Plan
              </span>
            </Button>
          </div>
          
          <SupplementsGrid recommendations={recommendations} />
        </div>
      </Card>
    </div>
  );
};