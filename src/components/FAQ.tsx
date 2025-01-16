import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What trading instruments are available?",
      answer: "You'll have access to major forex pairs, popular cryptocurrencies, and leading stock indices. All trading is done with virtual funds on a demo account.",
    },
    {
      question: "Are there any participation fees?",
      answer: "Yes, there is a small entry fee to ensure serious participation. This fee contributes to the prize pool and helps maintain the quality of the competition.",
    },
    {
      question: "How are winners determined?",
      answer: "Winners are ranked based on their final account balance, while adhering to all trading rules and risk management guidelines. Additional metrics like risk-adjusted returns may be considered for tiebreakers.",
    },
    {
      question: "How can I join the tournament?",
      answer: "Simply click the 'Join Tournament' button, complete the registration process, and pay the entry fee. You'll receive your demo account credentials immediately after confirmation.",
    },
  ];

  return (
    <section id="faq" className="bg-[#1A1F2C] py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-4">Got Questions?</p>
            <h2 className="text-5xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-white/10 transition-all duration-300 ease-in-out"
              >
                <AccordionTrigger 
                  className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-xl py-6 transition-all duration-300 ease-in-out group"
                >
                  <span className="group-data-[state=open]:scale-105 transition-transform duration-300">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-lg leading-relaxed overflow-hidden transition-all duration-500 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/lovable-uploads/3be0bad4-1cec-4a0a-9124-c48618edcdb8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </section>
  );
};

export default FAQ;
