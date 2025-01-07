import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="what-platform-does" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              What exactly does your platform do?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We provide personalized supplement recommendations based on your unique health data—lab tests, genetic information (optional), and health goals. Our AI analyzes these factors to suggest vitamins, minerals, and other supplements best suited for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="difference" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              How is this different from a regular supplement site or quiz-based recommendations?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Unlike generic quiz-based sites, we use real data from your lab tests and potentially genetic results to deliver evidence-based, dynamic recommendations that update over time as your health data changes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              Is my health information secure?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. We adhere to industry-standard security protocols and comply with relevant regulations (e.g., HIPAA in the U.S.) to protect your personal data. All sensitive information is encrypted both at rest and in transit.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-collection" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              What kind of data do you collect?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We collect lab results (e.g., vitamin levels, cholesterol readings), basic health metrics (e.g., weight, age), and optionally genetic data (from services like 23andMe), plus any self-reported lifestyle data (sleep, diet, etc.) you choose to provide. All data is NOT sold to any outside third party.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ai-decision" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              How does the AI decide which supplements I need?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our AI uses advanced algorithms that weigh your lab values, health goals, and known nutrient interactions. It references the latest clinical research and nutritional guidelines to suggest optimal supplements for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cost" className="bg-card rounded-lg p-4">
            <AccordionTrigger className="text-lg font-medium">
              What is the cost of using the platform?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our platform costs $10/month, but we also offer a family plan at $7/month for each member signed up.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;