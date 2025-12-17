import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you ensure lead quality?",
    answer: "We use a rigorous qualification process based on your ideal customer profile. Our callers are trained to ask the right questions and only pass through leads that meet your specific criteria. You'll only pay for quality leads that have real potential.",
  },
  {
    question: "Is there a long-term contract required?",
    answer: "No! We operate on flexible terms with no long-term commitments. You can start with a weekly package and cancel anytime. We believe in earning your business through results, not contracts.",
  },
  {
    question: "How does payment work?",
    answer: "We bill weekly or monthly based on your preference. Payment is processed securely via credit card or bank transfer. You'll receive detailed invoices with call logs and performance metrics.",
  },
  {
    question: "Do you offer a trial period?",
    answer: "Yes! We offer a pilot program where you can test our services with a small commitment first. This lets you evaluate our quality and fit before scaling up.",
  },
  {
    question: "How quickly can you get started?",
    answer: "We can typically have your campaign live within 3-5 business days. This includes discovery, script development, and caller training specific to your business.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with B2B companies across various industries including SaaS, professional services, real estate, financial services, healthcare, and more. Our callers are adaptable and quick to learn industry-specific terminology.",
  },
  {
    question: "How do appointments get booked to my calendar?",
    answer: "We integrate directly with your calendar system (Google Calendar, Outlook, Calendly, etc.). When our callers book an appointment, it automatically appears on your calendar with all relevant details about the prospect.",
  },
  {
    question: "What reporting do you provide?",
    answer: "You'll receive daily reports including calls made, connections, appointments set, and conversion metrics. We also provide weekly summaries and are always available for calls to discuss performance and optimization.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-soft transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
