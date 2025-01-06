import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const LabTestsSection = () => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded successfully",
        description: "Your lab test results will be processed shortly.",
      });
    }
  };

  const handlePurchase = () => {
    toast({
      title: "Redirecting to lab test purchase",
      description: "You'll be redirected to our partner's website to purchase your lab test.",
    });
  };

  return (
    <div className="mt-6 p-6 border-2 border-dashed rounded-lg bg-muted/50">
      <h3 className="text-lg font-semibold mb-4">Lab Tests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
          <Upload className="h-8 w-8 mb-2 text-primary" />
          <h4 className="font-medium mb-2">Upload Your Lab Tests</h4>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Drop your lab test results here or click to upload
          </p>
          <label className="w-full">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.csv,.xlsx"
              onChange={handleFileUpload}
            />
            <Button variant="outline" className="w-full">
              Choose File
            </Button>
          </label>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
          <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
          <h4 className="font-medium mb-2">Purchase a Lab Test</h4>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Get comprehensive lab testing through our trusted partners
          </p>
          <Button onClick={handlePurchase} className="w-full">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};