import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
	const faqs = [
		{
			question: '¿Qué instrumentos de trading están disponibles?',
			answer: 'Tendrás acceso a los principales pares de forex, criptomonedas populares e índices de acciones líderes. Todas las operaciones se realizan con fondos virtuales en una cuenta demo.',
		},
		{
			question: '¿Hay tarifas de participación?',
			answer: 'Sí, hay una pequeña tarifa de entrada para asegurar la participación seria. Esta tarifa contribuye al pozo de premios y ayuda a mantener la calidad de la competencia.',
		},
		{
			question: '¿Cómo se determinan los ganadores?',
			answer: 'Los ganadores se clasifican en función de su saldo final de cuenta, mientras se adhieren a todas las reglas de trading y directrices de gestión de riesgos. Se pueden considerar métricas adicionales como rendimientos ajustados por riesgo para desempates.',
		},
		{
			question: '¿Cómo puedo unirme al torneo?',
			answer: "Simplemente haz clic en el botón 'Unirse al Torneo', completa el proceso de registro y paga la tarifa de entrada. Recibirás tus credenciales de cuenta demo inmediatamente después de la confirmación.",
		},
	];

	return (
		<section id="faq" className="bg-[#1A1F2C] py-20 relative overflow-hidden">
			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					<div className="mb-12">
						<p className="text-white/70 text-sm uppercase tracking-wider mb-4">¿Tienes preguntas?</p>
						<h2 className="text-5xl font-bold text-white mb-8">Preguntas Frecuentes</h2>
					</div>

					<Accordion type="single" collapsible className="space-y-4">
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 transition-all duration-300 ease-in-out">
								<AccordionTrigger className="text-[#0EA5E9] hover:text-[#0EA5E9]/80 text-xl py-6 transition-all duration-300 ease-in-out group">
									<span className="group-data-[state=open]:scale-105 transition-transform duration-300">{faq.question}</span>
								</AccordionTrigger>
								<AccordionContent className="text-white/80 text-lg leading-relaxed overflow-hidden transition-all duration-500 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">{faq.answer}</AccordionContent>
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
