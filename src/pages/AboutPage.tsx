import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="absolute top-8 left-4 sm:left-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 mt-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About SupplementScribe.ai</h1>
            <p className="text-muted-foreground text-lg">
              Your personal health optimization companion powered by artificial intelligence.
            </p>
          </div>

          <div className="prose prose-lg">
            <h2>Our Mission</h2>
            <p>
              We believe that everyone should have access to the most affordable health services. After being overwhelmed and let down with traditional health advice, pharmaceutical drugs, and the traditional American food system our founder Sean Raineri discovered the power of testing your genes and giving them a fighting chance. Then, he starting supplementing towards the genetic variants that were causing anxiety, the MTHFR gene, and his life was changed. He feels that everyone deserves this power at an affordable price, but also someone that can hold them accountable in a friendly manner, find the best solutions just for them, while sticking to their budget can changes people's lives forever. Using artificial intelligence trained specifically for holistic health solutions can give the power back to people who are curious and want motivation to change their lives. Whether that issue is anxiety, depression, skin health, chronic illnesses, and many more that are now ever so prevalent in society, SupplementScribe is there for users at their disposal anytime.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>Personalized supplement recommendations based on your health profile</li>
              <li>AI-powered health assistant for real-time guidance</li>
              <li>Secure storage and analysis of your lab results</li>
              <li>Goal tracking and progress monitoring</li>
              <li>Evidence-based health optimization strategies</li>
            </ul>

            <h2>Family Plan</h2>
            <ul>
              <li>Help your family members too!</li>
              <li>Minimum size family of 3 to maximum 7, pay a discounted $15/month or $150/yearly per member</li>
              <li>Compete in family challenges for taking your supplements everyday and tracking your symptoms to earn special family prizes, may the best family member win!</li>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
