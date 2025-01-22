import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { BookOpen, Menu } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      {/* Navigation bar with logo */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16 max-w-[1400px] mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              SupplementScribe.ai
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/content")}
                className="text-gray-600 hover:text-black flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Content
              </Button>
              <Button variant="ghost" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-teal-50">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-grow flex items-center justify-center pt-20 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text content */}
              <div className="space-y-6 text-left">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Optimize Your Health with Supplements Tailored to Your Biology
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover your perfect supplement plan in minutes—backed by your blood tests, genetics, and health goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/input")}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 text-white text-lg h-14 px-8 rounded-full"
                  >
                    Get Started →
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    variant="outline"
                    className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 h-14 rounded-full"
                  >
                    Open Dashboard
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowHowItWorks(true)}
                    variant="outline"
                    className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 h-14 rounded-full"
                  >
                    How It Works
                  </Button>
                </div>
              </div>

              {/* Image section */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <img
                    src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
                    alt="Vitamin supplements"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="py-4">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500 max-w-4xl mx-auto px-4">
              <Link to="/privacy" className="hover:text-teal-600 transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link to="/about" className="hover:text-teal-600 transition-colors whitespace-nowrap">About</Link>
              <Link to="/work-with-us" className="hover:text-teal-600 transition-colors whitespace-nowrap">Work with Us</Link>
              <Link to="/terms" className="hover:text-teal-600 transition-colors whitespace-nowrap">Terms & Conditions</Link>
              <Link to="/rewards" className="hover:text-teal-600 transition-colors whitespace-nowrap">Rewards</Link>
              <Link to="/students" className="hover:text-teal-600 transition-colors whitespace-nowrap">Students</Link>
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};