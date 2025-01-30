import { LandingHero } from "@/components/LandingHero";
import { DnaAnimation } from "@/components/animations/DnaAnimation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LandingHero />
      <div className="container mx-auto px-4 py-12">
        <DnaAnimation />
      </div>
    </div>
  );
};

export default Index;