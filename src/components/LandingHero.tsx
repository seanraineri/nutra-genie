import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 p-4 flex gap-4">
        <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a>
        <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
      </div>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mb-2">
          Personalized Supplement
          <span className="text-primary block mt-2">Recommendations</span>
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-muted-foreground text-center mb-6">
          Using Science to Actually Get You Healthy
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-8">
          Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Open Dashboard
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Sign In
              </Button>
            </>
          )}
          <Button
            size="lg"
            onClick={() => setShowHowItWorks(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            How It Works
          </Button>
        </div>
        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8 text-sm text-muted-foreground">
          <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </>
  );
};