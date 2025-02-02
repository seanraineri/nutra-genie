import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, TestTube, DollarSign } from "lucide-react";

interface LabTest {
  id: string;
  partner_name: string;
  test_name: string;
  description: string | null;
  price: number;
  url: string;
}

const PurchaseTestsPage = () => {
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
      const { error } = await supabase
        .from('lab_test_purchases')
        .insert([
          {
            offering_id: test.id,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      window.open(test.url, '_blank');
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Purchase Testing
          </h1>
          <p className="text-muted-foreground mt-2">
            Select from our range of comprehensive health tests
          </p>
        </div>

        <div className="grid gap-6">
          {isLoadingTests ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            labTests?.map((test) => (
              <Card key={test.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TestTube className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">{test.test_name}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">by {test.partner_name}</p>
                  </div>
                  <div className="flex items-center text-xl font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {test.price}
                  </div>
                </div>
                {test.description && (
                  <p className="text-muted-foreground">{test.description}</p>
                )}
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

export default PurchaseTestsPage;