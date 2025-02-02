import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, TestTube, ArrowRight, Dna } from "lucide-react";

interface LabTest {
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
}

const LAB_TESTS: LabTest[] = [
  {
    name: "Complete Blood Panel",
    description: "Comprehensive blood work analysis including CBC, metabolic panel, lipids, and key biomarkers",
    price: 199.99,
    icon: <TestTube className="h-5 w-5" />,
  },
  {
    name: "Most Affordable DNA Test",
    description: "Basic DNA analysis covering ancestry, traits, and basic health predispositions",
    price: 99.99,
    icon: <Dna className="h-5 w-5" />,
  },
  {
    name: "Extensive DNA Test",
    description: "Deep whole genome sequencing with comprehensive health insights and genetic counseling",
    price: 299.99,
    icon: <Dna className="h-5 w-5" />,
  },
];

const PurchaseTestsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (test: LabTest) => {
    setIsLoading(true);
    try {
      toast({
        title: "Redirecting to test provider",
        description: `You'll be redirected to purchase ${test.name}.`,
      });
      
      // Simulate redirect
      setTimeout(() => {
        navigate('/payment');
      }, 1500);

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
        <div className="absolute top-0 left-4">
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
            Select from our recommended health tests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_TESTS.map((test, index) => (
            <Card key={index} className="p-4 relative overflow-hidden bg-white">
              <div className="flex flex-col items-center h-full">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  {test.icon}
                </div>
                <div className="text-center w-full mt-auto">
                  <h4 className="font-medium mb-2">
                    {test.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {test.description}
                  </p>
                  <p className="text-lg font-bold text-primary mb-4">
                    ${test.price}
                  </p>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handlePurchase(test)}
                    className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white border-0 transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Purchase"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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