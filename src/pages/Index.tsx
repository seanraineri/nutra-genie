import { LandingHero } from "@/components/LandingHero";
import { DnaAnimation } from "@/components/animations/DnaAnimation";
import { GridBackground } from "@/components/backgrounds/GridBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <GridBackground />
      <LandingHero />
      <div className="container mx-auto px-4 py-12">
        <DnaAnimation />
      </div>
    </div>
  );
};

export default Index;