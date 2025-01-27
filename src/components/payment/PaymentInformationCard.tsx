import { Card, CardContent } from '@/components/ui/card';
import { Clock, Bell, Shield, HelpCircle, Trophy } from 'lucide-react';

interface PaymentInformationCardProps {
	onAcceptTerms: (accepted: boolean) => void;
}

export function PaymentInformationCard({ onAcceptTerms }: PaymentInformationCardProps) {
	const sections = [
		{
			id: 'payment-works',
			title: 'Cómo Funciona el Pago',
			items: [
				{
					icon: Clock,
					title: 'Tiempo de Confirmación',
					description: 'Las transacciones en la red TRON (TRC20) son rápidas y, por lo general, se confirman en menos de 1 minuto. Sin embargo, en casos poco frecuentes, pueden tardar hasta 5 minutos dependiendo del tráfico de la red.',
					color: 'text-blue-600',
				},
				{
					icon: Bell,
					title: 'Notificación Automática',
					description: 'Una vez que el pago se confirme en la blockchain, recibirás una notificación por correo electrónico con los detalles de tu registro en el torneo.',
					color: 'text-yellow-600',
				},
			],
		},
		{
			id: 'why-usdt',
			title: 'Por Qué Usar USDT',
			items: [
				{
					icon: Shield,
					title: 'Transacciones Seguras',
					description: 'Las transacciones en USDT son seguras y se pueden rastrear en la blockchain.',
					color: 'text-green-600',
				},
			],
		},
		{
			id: 'support',
			title: 'Política de Soporte',
			items: [
				{
					icon: HelpCircle,
					title: '¿Tienes Preguntas?',
					description: 'Si tienes algún problema con tu transacción, nuestro equipo está aquí para ayudarte. Escríbenos a support@elitetraderhub.com.',
					color: 'text-purple-600',
				},
			],
		},
		{
			id: 'benefits',
			title: 'Beneficios de Participar',
			items: [
				{
					icon: Trophy,
					title: 'Beneficios del Torneo',
					description: ['Acceso exclusivo al Elite Trading Tournament, donde podrás ganar premios increíbles.', 'Conéctate con una comunidad de traders apasionados.', 'Una oportunidad única para poner a prueba tus habilidades en un entorno competitivo.'],
					color: 'text-indigo-600',
				},
			],
		},
	];

	return (
		<Card>
			<CardContent className="pt-4">
				<div className="space-y-6">
					{sections.map((section) => (
						<div key={section.id} className="space-y-3">
							<h2 className="text-xl font-semibold" style={{ fontSize: '1.1rem', lineHeight: '1.4rem' }}>
								{section.title}
							</h2>
							<div className="space-y-4">
								{section.items.map((item, index) => {
									const IconComponent = item.icon;
									return (
										<div key={index} className="flex items-start space-x-3">
											<div className={`${item.color} p-2 rounded-full bg-gray-50 flex-shrink-0`}>
												<IconComponent className="h-5 w-5" />
											</div>
											<div className="space-y-1">
												<h3 className="font-medium" style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>
													{item.title}
												</h3>
												{Array.isArray(item.description) ? (
													<ul className="space-y-1 list-disc pl-3">
														{item.description.map((bullet, idx) => (
															<li key={idx} style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }} className="text-gray-600">
																{bullet}
															</li>
														))}
													</ul>
												) : (
													<p className="text-gray-600" style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>
														{item.description}
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
