import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

export default function PaymentPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const email = new URLSearchParams(search).get('email');

  useEffect(() => {
    if (!email) {
      navigate('/input');
    }
  }, [email, navigate]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (loading) {
      setProgress(0);
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { email },
      });

      if (error) throw error;
      if (data?.url) {
        setProgress(100);
        setTimeout(() => {
          window.location.href = data.url;
        }, 500);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Complete Your Subscription</h1>
          <p className="text-muted-foreground">
            Get access to personalized health recommendations and AI-powered insights
          </p>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Health Assistant Pro</h3>
              <span className="text-xl font-bold">$20/month</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Personalized Health Recommendations</li>
              <li>✓ AI-Powered Health Assistant</li>
              <li>✓ Custom Supplement Plans</li>
              <li>✓ Progress Tracking</li>
            </ul>
          </div>

          {loading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-center text-muted-foreground">
                Creating your checkout session...
              </p>
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Subscribe Now"}
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          By subscribing, you agree to our terms of service and privacy policy
        </p>
      </Card>
    </div>
  );
}