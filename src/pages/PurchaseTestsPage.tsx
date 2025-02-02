import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

interface LabTest {
  id: string;
  partner_name: string;
  test_name: string;
  description: string;
  price: number;
  url: string;
}

export const PurchaseTestsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: labTests, isLoading: isLoadingTests } = useQuery({
    queryKey: ['labTests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lab_test_offerings')
        .select('*')
        .order('price', { ascending: true });

      if (error) {
        toast({
          title: "Error loading lab tests",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as LabTest[];
    },
  });

  const handlePurchase = async (test: LabTest) => {
    setIsLoading(true);
    try {
      // Record the purchase intent
      const { error } = await supabase
        .from('lab_test_purchases')
        .insert([
          {
            offering_id: test.id,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // Redirect to partner's website
      window.open(test.url, '_blank');
      
      // Navigate back to test results step
      navigate('/input');

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/10 to-teal-900/10 backdrop-blur-sm py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate('/input')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </Button>

        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
          Available Lab Tests
        </h1>

        <div className="grid gap-6">
          {isLoadingTests ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            labTests?.map((test) => (
              <Card key={test.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{test.test_name}</h2>
                    <p className="text-sm text-muted-foreground">by {test.partner_name}</p>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ${test.price}
                  </div>
                </div>
                <p className="text-muted-foreground">{test.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => handlePurchase(test)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Purchase Test'
                  )}
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};