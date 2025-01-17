import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { BookOpen } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {/* Navigation bar with logo */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10 border-b">
        <div className="w-full px-0">
          <div className="flex justify-between items-center h-16 px-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Supplement<span className="text-[#3498DB]">Scribe</span>
              <span className="text-sm sm:text-base text-muted-foreground">.ai</span>
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate("/content")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Content
            </Button>
          </div>
        </div>
      </div>

      {/* Main hero section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-16 sm:pt-24">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-[#0A4B75] block">The Future of Wellness,</span>
                <span className="text-[#3498DB] block mt-2">Getting You Healthy Today</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => navigate("/input")}
                className="bg-[#3498DB] hover:bg-[#3498DB]/90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                onClick={() => setShowHowItWorks(true)}
                variant="outline"
                className="border-[#0A4B75] text-[#0A4B75] hover:bg-[#0A4B75]/10 shadow-md hover:shadow-lg transition-all"
              >
                How It Works
              </Button>
              <Button
                size="lg"
                onClick={handleDashboardClick}
                variant="outline"
                className="border-[#3498DB] text-[#3498DB] hover:bg-[#3498DB]/10 shadow-md hover:shadow-lg transition-all"
              >
                Open Dashboard
              </Button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="hidden lg:block relative h-[600px] -mt-12 animate-fade-in rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[#F2FCE2]/30"></div>
            <img
              src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
              alt="Vitamin supplements"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        {/* Footer links */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-gray-600">
            <Link to="/privacy" className="hover:text-[#3498DB] transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#3498DB] transition-colors">About</Link>
            <Link to="/work-with-us" className="hover:text-[#3498DB] transition-colors">Work with Us</Link>
            <Link to="/terms" className="hover:text-[#3498DB] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </>
  );
};