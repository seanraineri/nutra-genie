import { LandingHero } from "@/components/LandingHero";
import { GridBackground } from "@/components/backgrounds/GridBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <GridBackground />
      <LandingHero />
    </div>
  );
};

export default Index;