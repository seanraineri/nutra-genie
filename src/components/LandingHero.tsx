import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { BookOpen, Menu, ShieldCheck } from "lucide-react";
import { DnaCapsuleMorph } from "./animations/DnaCapsuleMorph";

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
          <div className="flex-grow flex items-center justify-center py-16 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

              {/* Animation section */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <DnaCapsuleMorph />
              </div>
            </div>
          </div>

          {/* Feature points */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-start space-y-2 animate-fade-in">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="text-lg font-semibold text-teal-700">Backed by Science</h3>
              <p className="text-gray-600">Get recommendations validated by thousands of clinical studies.</p>
            </div>
            <div className="flex flex-col items-start space-y-2 animate-fade-in [animation-delay:200ms]">
              <div className="text-2xl mb-2">🧬</div>
              <h3 className="text-lg font-semibold text-teal-700">Personalized to You</h3>
              <p className="text-gray-600">Analyze your bloodwork, DNA, and lifestyle for a plan that fits.</p>
            </div>
            <div className="flex flex-col items-start space-y-2 animate-fade-in [animation-delay:400ms]">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-lg font-semibold text-teal-700">Track Your Progress</h3>
              <p className="text-gray-600">Monitor improvements in energy, sleep, and more over time.</p>
            </div>
            <div className="flex flex-col items-start space-y-2 animate-fade-in [animation-delay:600ms]">
              <div className="text-2xl mb-2">
                <ShieldCheck className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-700">HIPAA Compliant</h3>
              <p className="text-gray-600">All health data is encrypted and private.</p>
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
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};
