import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {/* Brand name */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Supplement<span className="text-primary">Scribe</span>
          <span className="text-sm sm:text-base text-muted-foreground">.ai</span>
        </h1>
      </div>

      {/* Main content with image */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-24 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="flex flex-col items-start space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
              The Future of Wellness,{" "}
              <span className="text-primary block mt-2">Getting You Healthy Today</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => navigate("/input")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                onClick={() => setShowHowItWorks(true)}
                variant="outline"
                className="hover:bg-primary/10"
              >
                How It Works
              </Button>
              <Button
                size="lg"
                onClick={handleDashboardClick}
                variant="outline"
                className="hover:bg-primary/10"
              >
                Open Dashboard
              </Button>
            </div>
          </div>

          {/* Image section - now with larger dimensions */}
          <div className="hidden lg:block relative h-[800px] animate-fade-in">
            <img
              src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
              alt="Vitamin supplements"
              className="absolute inset-0 w-full h-full object-contain scale-125"
            />
          </div>
        </div>

        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        {/* Footer links */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/work-with-us" className="hover:text-primary transition-colors">Work with Us</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </>
  );
};