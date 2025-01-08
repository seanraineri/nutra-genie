import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/LandingHero";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleDownloadSample = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/sample-lab-test.pdf';
    link.download = 'sample-lab-test.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Sample PDF Downloaded",
      description: "You can use this sample to test the lab results upload feature.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <LandingHero />
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleDownloadSample}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download Sample Lab Test PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;