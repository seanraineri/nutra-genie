import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const HealthDataForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vitaminD: "",
    vitaminB12: "",
    iron: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions to continue");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create user account
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (error) throw error;

      // Store health data
      const { error: healthDataError } = await supabase
        .from('lab_results')
        .insert([
          {
            test_name: 'Vitamin D',
            value: parseFloat(formData.vitaminD),
            unit: 'ng/mL',
          },
          {
            test_name: 'Vitamin B12',
            value: parseFloat(formData.vitaminB12),
            unit: 'pg/mL',
          },
          {
            test_name: 'Iron',
            value: parseFloat(formData.iron),
            unit: 'μg/dL',
          },
        ]);

      if (healthDataError) throw healthDataError;

      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-secondary">Create Your Account</h2>
          <p className="text-muted-foreground">
            Enter your information to get personalized health recommendations
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vitamin-d">Vitamin D Level (ng/mL)</Label>
            <Input
              id="vitaminD"
              type="number"
              value={formData.vitaminD}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b12">Vitamin B12 Level (pg/mL)</Label>
            <Input
              id="vitaminB12"
              type="number"
              value={formData.vitaminB12}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iron">Iron Level (μg/dL)</Label>
            <Input
              id="iron"
              type="number"
              value={formData.iron}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the{" "}
              <a href="/terms" className="text-primary hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={loading || !acceptedTerms}
        >
          {loading ? "Creating Account..." : "Create Account & Continue"}
        </Button>
      </form>
    </Card>
  );
};