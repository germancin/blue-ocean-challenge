import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
	question: string;
	answer: string;
}

const FAQ = () => {
	const { t } = useTranslation();
	const faqItems = t("faq.questions", { returnObjects: true }) as FAQItem[];

	// Estado para mostrar/ocultar preguntas
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section id="faq" className="bg-[#1A1F2C] py-20 relative overflow-hidden">
			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					{/* Sección del título con el botón */}
					<div className="mb-12 flex items-center justify-between">
						<div>
							<p className="text-white/70 text-sm uppercase tracking-wider mb-2">
								{t("faq.subtitle")}
							</p>
							<h2 className="text-5xl font-bold text-white">{t("faq.title")}</h2>
						</div>

						{/* Botón para expandir/cerrar todas las preguntas */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:bg-gray-600 transition-all duration-300">
							{isOpen ? t("faq.hide") : t("faq.show")}
							{isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
						</button>

					</div>

					{/* Sección de preguntas, visible solo cuando `isOpen` es `true` */}
					{isOpen && (
						<Accordion type="single" collapsible className="space-y-4">
							{faqItems.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="border-b border-white/10 transition-all duration-300 ease-in-out"
								>
									<AccordionTrigger className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-xl py-4 transition-all duration-300 ease-in-out group">
										<span className="group-data-[state=open]:scale-105 transition-transform duration-300">
											{faq.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="text-white/80 text-lg leading-relaxed overflow-hidden transition-all duration-500 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
										{faq.answer.split(/\*\*(.*?)\*\*/g).map((part, index) =>
											index % 2 === 1 ? <strong key={index}>{part}</strong> : part
										)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>
			</div>

			{/* Imagen de fondo con opacidad */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage:
						"url('/lovable-uploads/3be0bad4-1cec-4a0a-9124-c48618edcdb8.png')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
		</section>
	);
};

export default FAQ;
