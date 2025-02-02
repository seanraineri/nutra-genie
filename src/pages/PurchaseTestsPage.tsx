import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, TestTube, ArrowRight, Dna, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LabTest {
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
  image?: string;
  purchaseUrl?: string;
}

const LAB_TESTS: LabTest[] = [
  {
    name: "Complete Blood Panel",
    description: "Comprehensive blood work analysis including CBC, metabolic panel, lipids, and key biomarkers",
    price: 335,
    icon: <TestTube className="h-5 w-5" />,
    image: "/lovable-uploads/f92c565f-0ae1-4337-aaed-34237ff4d4bf.png",
    purchaseUrl: "https://www.questhealth.com/product/comprehensive-health-profile-standard-34603M.html"
  },
  {
    name: "Most Affordable DNA Test",
    description: "Download the Raw DNA file included, upload it to our site, find your nutrient deficiencies, receive results",
    price: 36,
    icon: <Dna className="h-5 w-5" />,
    image: "/lovable-uploads/9c9c4102-f5d3-409c-8b1b-5e8f96ebc430.png",
    purchaseUrl: "https://www.myheritage.com/order/3154917996/MhDna.LandingPageKitOnly.Offer?initialProductId=900&currency=USD&processor=adyen&thirdPartyPaymentProcessor=adyen"
  },
  {
    name: "Extensive DNA Test",
    description: "Direct testing of all key SNPs that effect your everyday function",
    price: 349,
    icon: <Dna className="h-5 w-5" />,
    image: "/lovable-uploads/59bef718-4d3c-4acf-9d3b-0c5168d0263d.png",
    purchaseUrl: "https://maxgenlabs.com/collections/genetic-testing-kits/products/the-works-panel"
  },
];

const PurchaseTestsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (test: LabTest) => {
    setIsLoading(true);
    try {
      if (test.purchaseUrl) {
        window.open(test.purchaseUrl, '_blank');
      } else {
        toast({
          title: "Redirecting to test provider",
          description: `You'll be redirected to purchase ${test.name}.`,
        });
        
        // Simulate redirect for tests without direct URLs
        setTimeout(() => {
          navigate('/payment');
        }, 1500);
      }
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
        <div className="absolute top-8 left-8">
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
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Purchase Testing
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  className="max-w-sm p-4 text-base bg-white border-2 border-cyan-200 shadow-lg"
                  sideOffset={8}
                >
                  These tests are optional, but we recommend taking a DNA test as you only need it once in your lifetime and can lead to finding information that can lower your blood biomarkers anyways. You can find any other blood or genetic test as well, but these are some we suggest
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-lg text-muted-foreground">
            Select from our recommended health tests, we recommend to prioritize the DNA test
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_TESTS.map((test, index) => (
            <Card key={index} className="p-4 relative overflow-hidden bg-white">
              <div className="flex flex-col items-center h-full">
                {test.image ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full h-48 relative mb-4 cursor-pointer transition-transform hover:scale-105">
                        <img 
                          src={test.image} 
                          alt={test.name}
                          className="w-full h-full object-contain filter drop-shadow-lg"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                      <img 
                        src={test.image} 
                        alt={test.name}
                        className="w-full h-auto object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    {test.icon}
                  </div>
                )}
                <div className="text-center w-full mt-auto">
                  <h4 className="font-medium mb-2">
                    {test.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {test.description}
                  </p>
                  <p className="text-lg font-bold text-primary mb-4">
                    ${test.price.toFixed(2)}
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
            onClick={() => navigate('/input?step=budget')}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 transition-colors"
          >
            Continue to Monthly Budget
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTestsPage;