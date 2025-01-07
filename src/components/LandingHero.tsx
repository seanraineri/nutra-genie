import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">HealthAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About Us
          </Link>
          <Link to="/faq" className="text-sm font-medium hover:underline underline-offset-4">
            FAQ
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Personal Health AI Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get personalized supplement recommendations based on your unique health data and goals.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/get-started">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};