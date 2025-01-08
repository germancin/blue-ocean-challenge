import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('faq.trading.question'),
      answer: t('faq.trading.answer'),
    },
    {
      question: t('faq.fees.question'),
      answer: t('faq.fees.answer'),
    },
    {
      question: t('faq.prizes.question'),
      answer: t('faq.prizes.answer'),
    },
    {
      question: t('faq.join.question'),
      answer: t('faq.join.answer'),
    },
  ];

  return (
    <section className="bg-[#1A1F2C] py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-4">{t('faq.wondering')}</p>
            <h2 className="text-5xl font-bold text-white mb-8">{t('faq.title')}</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-xl py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 text-lg leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* Background wave effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/lovable-uploads/eea68a6c-ea81-4774-a9e7-3b72f6e42949.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </section>
  );
};

export default FAQ;