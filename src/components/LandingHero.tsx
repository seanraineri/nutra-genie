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
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Supplement<span className="text-primary">Scribe</span>
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

      <div className="min-h-screen bg-[#F3F3F3]">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-32 pb-16">
            {/* Left column - Main content */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6 max-w-xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  The Future of Wellness
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/input")}
                    className="bg-[#FEF7CD] hover:bg-[#FEF7CD]/90 text-black text-lg h-14 px-8"
                  >
                    Go Shopping →
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowHowItWorks(true)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14"
                  >
                    How It Works
                  </Button>
                </div>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
                alt="Vitamin supplements"
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Footer links */}
          <div className="pb-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <Link to="/work-with-us" className="hover:text-gray-900 transition-colors">Work with Us</Link>
              <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms & Conditions</Link>
              <Link to="/rewards" className="hover:text-gray-900 transition-colors">Rewards</Link>
              <Link to="/students" className="hover:text-gray-900 transition-colors">Students</Link>
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};