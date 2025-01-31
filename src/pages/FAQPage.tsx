import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FAQPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-12 px-4">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="what-platform-does">
          <AccordionTrigger>What exactly does your platform do?</AccordionTrigger>
          <AccordionContent>
            We provide personalized supplement recommendations based on your unique health data—lab tests, genetic information (optional), and health goals. Our AI analyzes these factors to suggest vitamins, minerals, and other supplements best suited for you.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-different">
          <AccordionTrigger>How is this different from a regular supplement site or quiz-based recommendations?</AccordionTrigger>
          <AccordionContent>
            Unlike generic quiz-based sites, we use real data from your lab tests and potentially genetic results to deliver evidence-based, dynamic recommendations that update over time as your health data changes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="lab-tests">
          <AccordionTrigger>What kind of lab tests do you support?</AccordionTrigger>
          <AccordionContent>
            We support a wide range of standard blood tests, including complete blood count (CBC), comprehensive metabolic panel (CMP), vitamin D, B12, iron studies, thyroid function tests, and more. We also partner with specialized labs for more detailed testing options.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-security">
          <AccordionTrigger>Is my health information secure?</AccordionTrigger>
          <AccordionContent>
            Yes. We adhere to industry-standard security protocols and comply with relevant regulations (e.g., HIPAA in the U.S.) to protect your personal data. All sensitive information is encrypted both at rest and in transit.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-collection">
          <AccordionTrigger>What kind of data do you collect?</AccordionTrigger>
          <AccordionContent>
            We collect lab results (e.g., vitamin levels, cholesterol readings), basic health metrics (e.g., weight, age), and optionally genetic data (from services like 23andMe), plus any self-reported lifestyle data (sleep, diet, etc.) you choose to provide. All data is NOT sold to any outside third party.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ai-decision">
          <AccordionTrigger>How does the AI decide which supplements I need?</AccordionTrigger>
          <AccordionContent>
            Our AI uses advanced algorithms that weigh your lab values, health goals, and known nutrient interactions. It references the latest clinical research and nutritional guidelines to suggest optimal supplements for you.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="update-frequency">
          <AccordionTrigger>How often should I update my health data?</AccordionTrigger>
          <AccordionContent>
            We recommend updating your lab results every 3-6 months, or whenever you get new test results. For basic health metrics like weight and lifestyle factors, you can update these as frequently as they change. Regular updates help us provide more accurate recommendations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="supplement-quality">
          <AccordionTrigger>How do you ensure supplement quality?</AccordionTrigger>
          <AccordionContent>
            We only recommend supplements from manufacturers that follow Good Manufacturing Practices (GMP), have third-party testing, and maintain high quality standards. Our team regularly reviews and updates our supplement database based on the latest research and quality assessments.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="platform-cost">
          <AccordionTrigger>What is the cost of using the platform?</AccordionTrigger>
          <AccordionContent>
            Our platform costs $10/month for individual users. We also offer a family plan at $7/month per member. This includes all AI recommendations, health tracking features, and regular updates to your supplement plan. Lab tests, when ordered through our partners, are priced separately.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cancel-subscription">
          <AccordionTrigger>Can I cancel my subscription at any time?</AccordionTrigger>
          <AccordionContent>
            Yes, you can cancel your subscription at any time with no penalty. Your access will continue until the end of your current billing period. We also offer a 30-day money-back guarantee for new subscribers.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="medical-advice">
          <AccordionTrigger>Does this replace medical advice?</AccordionTrigger>
          <AccordionContent>
            No, our platform is not a replacement for professional medical advice. While we provide evidence-based supplement recommendations, you should always consult with your healthcare provider before starting any new supplement regimen, especially if you have existing health conditions or take medications.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
          <AccordionContent>
            We provide 24/7 email support and live chat during business hours. Our support team includes qualified nutritionists who can answer questions about your supplement recommendations. For technical issues, our tech support team is available Monday through Friday.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQPage;