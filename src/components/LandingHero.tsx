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
      <div className="fixed top-0 left-0 right-0 bg-[#1A1F2C]/80 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="w-full px-0">
          <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Supplement<span className="text-[#3498DB]">Scribe</span>
              <span className="text-sm sm:text-base text-gray-400">.ai</span>
            </h1>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/content")}
                className="text-gray-300 hover:text-white flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Content
              </Button>
              <Button
                className="bg-[#3498DB] hover:bg-[#3498DB]/90"
                onClick={() => navigate("/input")}
              >
                Start for free →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main hero section */}
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C3E50] text-white">
        <div className="relative pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="flex flex-col items-start space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-white">The Future of</span>
                  <span className="block text-[#3498DB]">Wellness.</span>
                  <span className="block text-gray-400 mt-2">Right where you are.</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
                  Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey — using data, science, or even your voice.
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => navigate("/input")}
                  className="bg-[#3498DB] hover:bg-[#3498DB]/90 text-white shadow-lg hover:shadow-xl transition-all px-8"
                >
                  START FOR FREE →
                </Button>
                <Button
                  size="lg"
                  onClick={() => setShowHowItWorks(true)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  How It Works
                </Button>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="hidden lg:block relative h-[600px] animate-fade-in">
              <div className="absolute inset-0 bg-[#F2FCE2]/10 rounded-2xl"></div>
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
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-[#3498DB] transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-[#3498DB] transition-colors">About</Link>
              <Link to="/work-with-us" className="hover:text-[#3498DB] transition-colors">Work with Us</Link>
              <Link to="/terms" className="hover:text-[#3498DB] transition-colors">Terms & Conditions</Link>
              <Link to="/rewards" className="hover:text-[#3498DB] transition-colors">Rewards</Link>
              <Link to="/students" className="hover:text-[#3498DB] transition-colors">Students</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};