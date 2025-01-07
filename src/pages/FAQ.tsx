import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What exactly does your platform do?",
      answer: "We provide personalized supplement recommendations based on your unique health data—lab tests, genetic information (optional), and health goals. Our AI analyzes these factors to suggest vitamins, minerals, and other supplements best suited for you."
    },
    {
      question: "How is this different from a regular supplement site or quiz-based recommendations?",
      answer: "Unlike generic quiz-based sites, we use real data from your lab tests and potentially genetic results to deliver evidence-based, dynamic recommendations that update over time as your health data changes."
    },
    {
      question: "Is my health information secure?",
      answer: "Yes. We adhere to industry-standard security protocols and comply with relevant regulations (e.g., HIPAA in the U.S.) to protect your personal data. All sensitive information is encrypted both at rest and in transit."
    },
    {
      question: "What kind of data do you collect?",
      answer: "We collect lab results (e.g., vitamin levels, cholesterol readings), basic health metrics (e.g., weight, age), and optionally genetic data (from services like 23andMe), plus any self-reported lifestyle data (sleep, diet, etc.) you choose to provide. All data is NOT sold to any outside third party."
    },
    {
      question: "How does the AI decide which supplements I need?",
      answer: "Our AI uses advanced algorithms that weigh your lab values, health goals, and known nutrient interactions. It references the latest clinical research and nutritional guidelines to suggest optimal supplements for you."
    },
    {
      question: "What is the cost of using the platform?",
      answer: "Our platform costs $10/month, but we also offer a family plan at $7/month for each member signed up."
    }
  ];

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;