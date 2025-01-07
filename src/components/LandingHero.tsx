import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div className="fixed top-0 right-0 p-4 flex gap-4">
        <Link 
          to="/faq" 
          className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          aria-label="View Frequently Asked Questions"
        >
          FAQ
        </Link>
        <Link 
          to="/about" 
          className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        >
          About Us
        </Link>
        <Link 
          to="/contact" 
          className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        >
          Contact
        </Link>
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
          <Button
            size="lg"
            onClick={() => navigate("/input")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Open Dashboard
          </Button>
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
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </>
  );
};