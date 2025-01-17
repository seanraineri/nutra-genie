import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About SupplementScribe.ai</h1>
            <p className="text-muted-foreground text-lg">
              Your personal health optimization companion powered by artificial intelligence.
            </p>
          </div>

          <div className="prose prose-lg">
            <h2>Our Mission</h2>
            <p>
              We believe that everyone deserves access to personalized health insights
              and recommendations. By combining cutting-edge AI technology with
              scientific research, we help you make informed decisions about your
              health and wellness journey.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>Personalized supplement recommendations based on your health profile</li>
              <li>AI-powered health assistant for real-time guidance</li>
              <li>Secure storage and analysis of your lab results</li>
              <li>Goal tracking and progress monitoring</li>
              <li>Evidence-based health optimization strategies</li>
            </ul>

            <h2>Privacy & Security</h2>
            <p>
              Your health data is precious, and we treat it that way. All information
              is encrypted and stored securely. We never share your personal data
              with third parties without your explicit consent.
            </p>
          </div>

          <div className="flex gap-4 pt-8">
            <Button asChild>
              <Link to="/input">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;