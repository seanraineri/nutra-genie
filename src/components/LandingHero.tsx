import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mb-6">
        Personalized Supplement
        <span className="text-primary block mt-2">Recommendations</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-8">
        Get tailored supplement recommendations based on your blood work and genetic data. Track your progress and optimize your health journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={() => navigate("/input")}
          className="bg-primary hover:bg-primary/90"
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="border-primary text-primary hover:bg-primary/10"
        >
          View Demo Dashboard
        </Button>
      </div>
    </div>
  );
};