import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { Book, Menu, ShieldCheck } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      {/* Navigation bar with logo */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-100/50">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16 max-w-[1400px] mx-auto">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/3ac3b205-09c1-4160-88b8-65e4fd82034a.png" 
                alt="SupplementScribe Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/content")}
                className="text-gray-600 hover:text-black"
              >
                <Book className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-grow flex items-center justify-center py-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="space-y-6 text-left">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent animate-text-shimmer animate-glow-pulse leading-[1.2] pb-4">
                  Optimize Your Health with Supplements Tailored to Your Biology
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed font-light">
                  Feel better, naturally. Discover your perfect supplement plan in minutes—backed by your blood tests, genetics, and health goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/input")}
                    className="bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 bg-[length:200%_200%] hover:opacity-90 text-white text-lg h-14 px-8 rounded-full animate-gradient-flow animate-button-glow transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started →
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    variant="outline"
                    className="border-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 h-14 rounded-full text-lg font-medium transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Open Dashboard
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowHowItWorks(true)}
                    variant="outline"
                    className="border-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 h-14 rounded-full text-lg font-medium transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
                  >
                    How It Works
                  </Button>
                </div>
              </div>

              {/* Image section */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10">
                  <img
                    src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
                    alt="Vitamin supplements"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature points */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-4 animate-fade-in bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center h-16 w-16">
                <span className="text-4xl animate-float-in-place">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-200 animate-glow-pulse text-center">Backed by Science</h3>
              <p className="text-gray-300 font-light text-center">Get recommendations validated by thousands of clinical studies.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 animate-fade-in [animation-delay:200ms] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center h-16 w-16">
                <span className="text-4xl animate-float-circular">🧬</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-200 animate-glow-pulse text-center">Personalized to You</h3>
              <p className="text-gray-300 font-light text-center">Analyze your bloodwork, DNA, and lifestyle for a plan that fits.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 animate-fade-in [animation-delay:400ms] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center h-16 w-16">
                <span className="text-4xl animate-float-in-place">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-200 animate-glow-pulse text-center">Track Your Progress</h3>
              <p className="text-gray-300 font-light text-center">Monitor improvements in energy, sleep, and more over time.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 animate-fade-in [animation-delay:600ms] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center h-16 w-16">
                <ShieldCheck className="h-12 w-12 text-teal-200 animate-float-circular" />
              </div>
              <h3 className="text-lg font-semibold text-teal-200 animate-glow-pulse text-center">HIPAA Compliant</h3>
              <p className="text-gray-300 font-light text-center">All health data is encrypted and private.</p>
            </div>
          </div>

          {/* Footer links */}
          <div className="py-4">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400 max-w-4xl mx-auto px-4">
              <Link to="/privacy" className="hover:text-teal-200 transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link to="/about" className="hover:text-teal-200 transition-colors whitespace-nowrap">About</Link>
              <Link to="/work-with-us" className="hover:text-teal-200 transition-colors whitespace-nowrap">Work with Us</Link>
              <Link to="/terms" className="hover:text-teal-200 transition-colors whitespace-nowrap">Terms & Conditions</Link>
              <Link to="/rewards" className="hover:text-teal-200 transition-colors whitespace-nowrap">Rewards</Link>
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};