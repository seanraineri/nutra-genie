import { supabase } from "@/integrations/supabase/client";

export const addSupplementRecommendation = async (supplement: {
  supplement_name: string;
  dosage: string;
  reason: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from('supplement_recommendations')
    .insert({
      user_id: user.id,
      ...supplement,
      priority: 1,
    });

  if (error) throw error;
};