import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Award, Gift, ShoppingCart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Reward {
  name: string;
  cost: number;
  icon: JSX.Element;
  image?: string;
}

const REWARDS: Reward[] = [
  { 
    name: "Free Supplement Bottle", 
    cost: 5000, 
    icon: <ShoppingCart className="h-5 w-5" />,
    image: "/lovable-uploads/1b0c4728-5664-4329-864c-55fa2a245e8c.png"
  },
  { name: "Custom Water Bottle", cost: 10000, icon: <Gift className="h-5 w-5" /> },
  { name: "Custom Merch of the Month", cost: 15000, icon: <Star className="h-5 w-5" /> },
  { name: "Fitness Class (F45/Barry's/Spincycle)", cost: 20000, icon: <Award className="h-5 w-5" /> },
];

export const XPStore = () => {
  const { toast } = useToast();
  const [userXP, setUserXP] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserXP();
  }, []);

  const fetchUserXP = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_xp')
        .select('total_xp')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserXP(data?.total_xp || 0);
    } catch (error) {
      console.error('Error fetching XP:', error);
    }
  };

  const handleRedeemReward = async (reward: Reward) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (userXP < reward.cost) {
        toast({
          title: "Insufficient XP",
          description: `You need ${reward.cost - userXP} more XP to redeem this reward.`,
          variant: "destructive",
        });
        return;
      }

      const { error: redemptionError } = await supabase
        .from('reward_redemptions')
        .insert({
          user_id: user.id,
          reward_type: reward.name,
          xp_cost: reward.cost,
        });

      if (redemptionError) throw redemptionError;

      const { error: updateError } = await supabase
        .from('user_xp')
        .update({ total_xp: userXP - reward.cost })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchUserXP();
      
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name}. Our team will contact you soon.`,
      });
    } catch (error: any) {
      console.error('Error redeeming reward:', error);
      toast({
        title: "Error",
        description: "Failed to redeem reward. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">XP Store</h3>
            <p className="text-sm text-muted-foreground">
              Redeem your XP for exclusive rewards
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
            <Star className="h-5 w-5 text-primary" />
            <span className="font-semibold">{userXP} XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REWARDS.map((reward, index) => (
            <Card key={index} className="p-4 relative overflow-hidden group">
              <div className="flex flex-col items-center gap-3">
                {reward.image ? (
                  <div className="w-32 h-32 relative mb-4">
                    <img 
                      src={reward.image} 
                      alt={reward.name}
                      className="w-full h-full object-contain animate-float-circular filter drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-primary/10 rounded-lg mb-2">
                    {reward.icon}
                  </div>
                )}
                <div className="text-center">
                  <h4 className="font-medium mb-1">{reward.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {reward.cost} XP
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading || userXP < reward.cost}
                    onClick={() => handleRedeemReward(reward)}
                    className="w-full bg-transparent border border-[#0EA5E9]/50 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-300 animate-button-glow"
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium">How to Earn XP</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Daily Supplement Log</span>
              <span className="font-medium">10 XP</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Daily Quiz</span>
              <span className="font-medium">50 XP</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Share Plan</span>
              <span className="font-medium">100 XP</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Refer a Friend</span>
              <span className="font-medium">500 XP</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};