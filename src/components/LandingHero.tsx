import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Full-width background image section */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/593cb61a-d973-420b-8927-b94e9371fa17.png" 
          alt="Healthy lifestyle" 
          className="w-full h-full object-cover brightness-[0.85]"
        />
      </div>

      {/* Brand name - absolute positioned */}
      <div className="absolute top-0 left-0 p-4 z-10">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Supplement<span className="text-accent">Scribe</span>
          <span className="text-xs sm:text-sm text-white/70">.ai</span>
        </h1>
      </div>

      {/* Main content - overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            FIND YOUR
            <span className="block text-accent">PERFECT HEALTH</span>
            <span className="block">BALANCE.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-8">
            Built with advanced AI technology, connect with the latest research,
            and get personalized supplement recommendations that actually work for your body.
          </p>
          
          {/* Buttons - horizontal layout with proper spacing */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/input")}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
            >
              Start Taking Control
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg backdrop-blur-sm"
            >
              Open Dashboard
            </Button>
            <Button
              size="lg"
              onClick={() => setShowHowItWorks(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg backdrop-blur-sm"
            >
              How It Works
            </Button>
          </div>
        </div>

        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        {/* Footer links - absolute positioned */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="flex gap-8 text-sm text-white/70">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/work-with-us" className="hover:text-white transition-colors">Work with Us</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};