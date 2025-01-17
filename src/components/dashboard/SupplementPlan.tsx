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
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Personalized Supplement Plan</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share className="h-4 w-4" />
          Share Plan
        </Button>
      </div>
      <SupplementsGrid recommendations={recommendations} />
    </Card>
  );
};