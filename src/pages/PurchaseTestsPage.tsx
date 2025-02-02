import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, TestTube, DollarSign, Building2, Info, ExternalLink, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="absolute top-0 left-4 sm:left-8">
          <Button
            variant="outline"
            onClick={() => navigate('/input')}
            className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 border-cyan-200/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12 mt-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-3">
            Purchase Testing
          </h1>
          <p className="text-lg text-muted-foreground">
            Select from our comprehensive range of health tests
          </p>
        </div>

        <div className="grid gap-6">
          {isLoadingTests ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            labTests?.map((test) => (
              <Card key={test.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TestTube className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {test.test_name}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>by {test.partner_name}</span>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 text-xl font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                            <DollarSign className="h-5 w-5" />
                            {test.price}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Test price in USD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                {test.description && (
                  <CardContent className="pb-4">
                    <div className="flex gap-2 text-muted-foreground">
                      <Info className="h-5 w-5 flex-shrink-0 mt-1" />
                      <p>{test.description}</p>
                    </div>
                  </CardContent>
                )}
                <CardFooter>
                  <Button 
                    className="w-full group-hover:shadow-md transition-shadow"
                    onClick={() => handlePurchase(test)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Purchase Test
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="fixed bottom-8 right-8">
          <Button 
            onClick={() => navigate('/payment')}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 transition-colors"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTestsPage;