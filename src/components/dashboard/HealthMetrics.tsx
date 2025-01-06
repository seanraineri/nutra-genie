import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const HealthMetrics = () => {
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
    <Card className="p-4 md:p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's an overview of your health metrics and goals.</p>
        </div>

        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-lg border">
            <h3 className="font-semibold text-secondary mb-2">Personal Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>32 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span>Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height:</span>
                <span>5'10" (178 cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight:</span>
                <span>165 lbs (75 kg)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border">
            <h3 className="font-semibold text-secondary mb-2">Health Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercise Level:</span>
                <span className="text-primary font-medium">Medium</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Current Medications:</span>
                <span className="text-sm">
                  - Vitamin D3 (1000 IU)<br />
                  - Fish Oil (1000mg)
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Existing Conditions:</span>
                <span className="text-sm">
                  - Seasonal allergies<br />
                  - Mild hypertension
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-secondary mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Update Health Information
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Download Health Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Schedule Health Review
              </Button>
            </div>
          </div>
        </div>
        
        {/* Vitamin Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-primary">Vitamin D Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 45 ng/mL
              <br />
              Target range: 30-50 ng/mL
            </p>
            <Progress value={75} className="mt-2" />
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-accent">B12 Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 550 pg/mL
              <br />
              Target range: 400-1000 pg/mL
            </p>
            <Progress value={65} className="mt-2" />
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-semibold text-secondary">Iron Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 95 μg/dL
              <br />
              Target range: 60-170 μg/dL
            </p>
            <Progress value={85} className="mt-2" />
          </div>
        </div>

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
      </div>
    </Card>
  );
};