import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Supplement {
  supplement_name: string;
  dosage: string;
  reason: string;
  company_name: string;
  product_url: string;
  image_url: string;
}

export const SupplementPlan = () => {
  const [recommendations, setRecommendations] = useState<Supplement[]>([]);

  useEffect(() => {
    // Fetch initial data
    const fetchSupplements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('supplement_recommendations')
        .select('supplement_name, dosage, reason, company_name, product_url, image_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching supplements:', error);
        return;
      }

      setRecommendations(data || []);
    };

    fetchSupplements();

    // Subscribe to real-time changes
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

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Personalized Supplement Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="overflow-hidden">
            {rec.image_url && (
              <div className="relative h-48 w-full">
                <img
                  src={rec.image_url}
                  alt={rec.supplement_name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-primary">{rec.supplement_name}</h3>
              {rec.company_name && (
                <p className="text-sm text-muted-foreground mb-2">by {rec.company_name}</p>
              )}
              <div className="space-y-2">
                <p className="text-sm font-medium">Dosage: {rec.dosage}</p>
                <p className="text-sm">Purpose: {rec.reason}</p>
                {rec.product_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => window.open(rec.product_url, '_blank')}
                  >
                    View Product <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        {recommendations.length === 0 && (
          <p className="text-muted-foreground text-center py-4 col-span-full">
            No supplement recommendations yet. Chat with the health assistant to get personalized recommendations.
          </p>
        )}
      </div>
    </Card>
  );
};