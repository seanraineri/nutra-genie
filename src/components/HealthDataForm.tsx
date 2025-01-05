import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HealthDataForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Data processed successfully",
        description: "Redirecting to your personalized dashboard",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-secondary">Health Data Input</h2>
          <p className="text-muted-foreground">
            Enter your blood test and genetic data for personalized recommendations
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vitamin-d">Vitamin D Level (ng/mL)</Label>
            <Input
              id="vitamin-d"
              type="number"
              placeholder="Enter value"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b12">Vitamin B12 Level (pg/mL)</Label>
            <Input
              id="b12"
              type="number"
              placeholder="Enter value"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iron">Iron Level (μg/dL)</Label>
            <Input
              id="iron"
              type="number"
              placeholder="Enter value"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genetic-file">Genetic Test Results</Label>
            <Input
              id="genetic-file"
              type="file"
              accept=".csv,.txt"
              className="cursor-pointer"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Processing..." : "Generate Recommendations"}
        </Button>
      </form>
    </Card>
  );
};