import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    console.log("LandingHero mounted");
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (event === 'SIGNED_IN') {
        console.log("User signed in, attempting navigation");
        navigate('/dashboard');
      }
    });

    return () => {
      console.log("LandingHero unmounting");
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleDashboardClick = async () => {
    try {
      console.log("Dashboard button clicked");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session?.user?.id);
      
      if (session) {
        console.log("Session exists, navigating to dashboard");
        navigate('/dashboard');
      } else {
        console.log("No session, showing error");
        setAuthError("Please log in to access the dashboard");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setAuthError("An error occurred while checking your session");
    }
  };

  return (
    <>
      {/* Brand name - responsive sizing */}
      <div className="fixed top-0 left-0 p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Supplement<span className="text-primary">Scribe</span>
          <span className="text-xs sm:text-sm text-muted-foreground">.ai</span>
        </h1>
      </div>

      {/* Navigation - single About button */}
      <div className="fixed top-0 right-0 p-2 sm:p-4">
        <Button 
          variant="ghost"
          onClick={() => navigate("/about")}
          className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
        >
          About
        </Button>
      </div>

      {/* Main content - better padding and text sizing */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 sm:pt-0 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-secondary mb-2">
          Personalized Supplement
          <span className="text-primary block mt-2">Recommendations</span>
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground text-center mb-4 sm:mb-6">
          Using Science to Actually Get You Healthy
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-6 sm:mb-8 px-2">
          Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
        </p>
        
        {/* Error message */}
        {authError && (
          <div className="text-red-500 mb-4 text-center">
            {authError}
          </div>
        )}
        
        {/* Buttons - stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
          <Button
            size="lg"
            onClick={() => navigate("/input")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            onClick={handleDashboardClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          >
            Open Dashboard
          </Button>
          <Button
            size="lg"
            onClick={() => setShowHowItWorks(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          >
            How It Works
          </Button>
        </div>

        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        {/* Footer links - better spacing */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground px-2">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </>
  );
};