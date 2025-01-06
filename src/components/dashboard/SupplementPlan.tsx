import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Supplement {
  supplement_name: string;
  dosage: string;
  reason: string;
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
        .select('supplement_name, dosage, reason')
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
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-primary">{rec.supplement_name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Dosage: {rec.dosage}</p>
            <p className="text-sm text-muted-foreground">{rec.reason}</p>
          </div>
        ))}
        {recommendations.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No supplement recommendations yet. Chat with the health assistant to get personalized recommendations.
          </p>
        )}
      </div>
    </Card>
  );
};