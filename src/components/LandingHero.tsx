import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { HowItWorksModal } from "./HowItWorksModal";
import { useState } from "react";
import { MessageCircle, Github, Twitter, Linkedin } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Brand name - with improved contrast */}
      <div className="fixed top-0 left-0 p-4 z-10">
        <h1 className="text-xl sm:text-2xl font-bold">
          Supplement<span className="text-primary">Scribe</span>
          <span className="text-xs sm:text-sm text-muted-foreground">.ai</span>
        </h1>
      </div>

      {/* Main content - improved spacing and alignment */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 sm:pt-0 animate-fade-in max-w-6xl mx-auto">
        <div className="w-full md:w-3/4 lg:w-2/3 space-y-8 text-center md:text-left md:pl-8">
          {/* Main heading with increased size and improved typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary tracking-tight">
            Personalized Supplement
            <span className="text-primary block mt-2">Recommendations</span>
          </h1>

          {/* Subheading with different font weight */}
          <h2 className="text-xl sm:text-2xl font-normal text-muted-foreground">
            Using Science to Actually Get You Healthy
          </h2>

          {/* Body text with improved readability */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
          </p>
          
          {/* Buttons with improved spacing and hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => navigate("/input")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground transform transition-all duration-200 hover:scale-105 text-lg px-8 py-6 h-auto"
              aria-label="Get Started with SupplementScribe"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg text-lg px-8 py-6 h-auto"
              aria-label="Open your dashboard"
            >
              Open Dashboard
            </Button>
            <Button
              size="lg"
              onClick={() => setShowHowItWorks(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg text-lg px-8 py-6 h-auto"
              aria-label="Learn how SupplementScribe works"
            >
              How It Works
            </Button>
          </div>

          {/* Feedback button */}
          <div className="mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/feedback")}
              className="group hover:bg-primary/10 transition-colors"
              aria-label="Provide feedback"
            >
              <MessageCircle className="mr-2 h-4 w-4 group-hover:text-primary" />
              Provide Feedback
            </Button>
          </div>
        </div>

        <HowItWorksModal open={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
        
        {/* Footer with improved styling */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Social links */}
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="View our GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            {/* Footer links with improved spacing and hover effects */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/work-with-us" className="hover:text-primary transition-colors">Work with Us</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};