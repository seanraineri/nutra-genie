import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { BookOpen, Menu, ShieldCheck } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      {/* Sticky Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16 max-w-[1400px] mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              SupplementScribe.ai
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/content")}
                className="text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors hidden md:flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Content
              </Button>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-grow flex items-center justify-center py-16 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="space-y-8 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  Optimize Your Health with{" "}
                  <span className="text-primary">Personalized Supplements</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover your perfect supplement plan in minutes—backed by your blood tests, genetics, and health goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/input")}
                    className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started →
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    variant="outline"
                    className="border-2 border-primary/20 text-primary hover:bg-primary/5 h-14 rounded-full"
                  >
                    Open Dashboard
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowHowItWorks(true)}
                    variant="outline"
                    className="border-2 border-primary/20 text-primary hover:bg-primary/5 h-14 rounded-full"
                  >
                    How It Works
                  </Button>
                </div>
              </div>

              {/* Image section */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <img
                    src="/lovable-uploads/2f53b616-9c59-4de0-abb0-263c4a144685.png"
                    alt="Vitamin supplements"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature points */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-start space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="text-lg font-semibold text-gray-900">Backed by Science</h3>
              <p className="text-gray-600">Get recommendations validated by thousands of clinical studies.</p>
            </div>
            <div className="flex flex-col items-start space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in [animation-delay:200ms]">
              <div className="text-2xl mb-2">🧬</div>
              <h3 className="text-lg font-semibold text-gray-900">Personalized to You</h3>
              <p className="text-gray-600">Analyze your bloodwork, DNA, and lifestyle for a plan that fits.</p>
            </div>
            <div className="flex flex-col items-start space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in [animation-delay:400ms]">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-lg font-semibold text-gray-900">Track Your Progress</h3>
              <p className="text-gray-600">Monitor improvements in energy, sleep, and more over time.</p>
            </div>
            <div className="flex flex-col items-start space-y-3 p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in [animation-delay:600ms]">
              <div className="text-2xl mb-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">HIPAA Compliant</h3>
              <p className="text-gray-600">All health data is encrypted and private.</p>
            </div>
          </div>

          {/* Footer links */}
          <div className="py-8 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500 max-w-4xl mx-auto px-4">
              <Link to="/privacy" className="hover:text-primary transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap">About</Link>
              <Link to="/work-with-us" className="hover:text-primary transition-colors whitespace-nowrap">Work with Us</Link>
              <Link to="/terms" className="hover:text-primary transition-colors whitespace-nowrap">Terms & Conditions</Link>
              <Link to="/rewards" className="hover:text-primary transition-colors whitespace-nowrap">Rewards</Link>
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};