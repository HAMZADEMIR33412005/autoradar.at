import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "How does autoradar.at integrate with my existing systems?",
      answer: "Our tool offers seamless API integration with most dealership management systems. We provide comprehensive documentation and support to ensure a smooth integration process."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer various levels of support depending on your plan, ranging from email support to 24/7 priority assistance and a dedicated account manager for enterprise clients."
    },
    {
      question: "Can I customize the AI filters?",
      answer: "Yes! Pro and Enterprise plans allow you to customize AI filters based on your specific needs and preferences. Enterprise plans even include custom AI model training."
    },
    {
      question: "How accurate is the AI filtering?",
      answer: "Our AI model has been trained on millions of car listings and achieves over 95% accuracy in identifying optimal matches based on your criteria."
    },
    {
      question: "Is there a limit to the number of listings I can analyze?",
      answer: "Limits vary by plan. Basic plans include up to 100 listings per month, Pro plans up to 500, and Enterprise plans offer unlimited listings."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h2 className="heading-2 text-center mb-16">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="faq-item"
            >
              <AccordionTrigger className="px-6 hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};