import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 p-4">
        <h1 className="text-2xl font-bold">
          Supplement<span className="text-primary">Scribe</span>
          <span className="text-sm text-muted-foreground">.ai</span>
        </h1>
      </div>
      <div className="fixed top-0 right-0 p-4 flex gap-4">
        <Button 
          variant="ghost"
          onClick={() => navigate("/faq")}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          FAQ
        </Button>
        <Button 
          variant="ghost"
          onClick={() => navigate("/about")}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          About Us
        </Button>
        <Button 
          variant="ghost"
          onClick={() => navigate("/contact")}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Contact
        </Button>
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
