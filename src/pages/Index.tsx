import { LandingHero } from "@/components/LandingHero";
import { GridBackground } from "@/components/backgrounds/GridBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-slate-950">
      <GridBackground />
      <LandingHero />
    </div>
  );
};

export default Index;