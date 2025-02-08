import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState, useEffect } from "react";
import { Book, Menu, ShieldCheck } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isWhyVisible, setIsWhyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsWhyVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const whySection = document.getElementById("why-section");
    if (whySection) {
      observer.observe(whySection);
    }

    return () => {
      if (whySection) {
        observer.unobserve(whySection);
      }
    };
  }, []);

  return (
    <>
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
          <div className="flex-grow flex items-center justify-center py-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <div 
            id="why-section"
            className={`max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-8 transition-all duration-700 transform bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl mt-16 sm:mt-24 mb-12 sm:mb-16 shadow-2xl ${
              isWhyVisible 
                ? 'translate-y-0 opacity-100 scale-105' 
                : 'translate-y-20 opacity-0 scale-95'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent animate-glow-pulse">
              Why SupplementScribe?
            </h2>
            <div className="space-y-8 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 text-center">
                Stop Wasting Money on Generic Supplements!
              </h3>
              
              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-medium text-teal-300">Overwhelmed by Choices?</h4>
                <p className="text-gray-200">
                  Up to 80% of supplement users take products that aren't tailored to their unique needs. That means you might be wasting money and even risking your health.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-medium text-teal-300">Not Getting the Results You Need?</h4>
                <p className="text-gray-200">
                  Standard multivitamins and powders often miss the mark. They don't match your body's exact nutritional needs, which can lead to under- or over-supplementation.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg sm:text-xl font-medium text-teal-300">Experience a Tailor-Made Supplement Plan:</h4>
                <div className="space-y-2 pl-4">
                  <div>
                    <p className="text-cyan-300 font-medium">Personal Data, Personal Plan:</p>
                    <p className="text-gray-200">
                      SupplementScribe collects your health info, lifestyle habits, blood test results, and even genetic insights.
                    </p>
                  </div>
                  <div>
                    <p className="text-cyan-300 font-medium">Customized Just for You:</p>
                    <p className="text-gray-200">
                      We create a supplement plan that fits your unique body profile—so you only get what you truly need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-medium text-teal-300">Feel Energized and Confident:</h4>
                <p className="text-gray-200">
                  Imagine a supplement regimen that boosts your energy, supports your well-being, and saves you from unnecessary spending.
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-xl sm:text-2xl font-semibold text-cyan-400">Take Control of Your Health Today!</p>
                <p className="text-gray-200 mt-2">
                  Discover your personalized supplement plan with SupplementScribe and finally get the tailored support your body deserves.
                </p>
              </div>
            </div>
          </div>

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
