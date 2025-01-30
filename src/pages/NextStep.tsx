import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const NextStep = () => {
	const location = useLocation();
	const { toast } = useToast();
	const [isChatting, setIsChatting] = useState(false);
	const paymentId = location.state?.paymentId;

	const startChat = async () => {
		setIsChatting(true);
		toast({
			title: 'Iniciando chat...',
			description: 'Conectando con nuestra agente IA...',
		});
		// AI chat implementation will be added here
	};

	return (
		<main className="min-h-screen bg-navy">
			<Navbar />
			<div className="container mx-auto px-4 py-24">
				<div className="max-w-3xl mx-auto space-y-12">
					{/* Step 1: Payment Confirmation */}
					<Card className="p-8 bg-white/10 backdrop-blur">
						<h2 className="text-3xl font-bold mb-6 text-white">¡Felicidades! 🎉</h2>
						<p className="text-xl text-light-gray mb-4">
							Has completado exitosamente tu pago y ahora eres parte del torneo de trading con nosotros.
						</p>
						{paymentId && (
							<p className="text-sm text-light-gray/80">
								ID de Pago: {paymentId}
							</p>
						)}
					</Card>

					{/* Step 2: AI Chat */}
					<Card className="p-8 bg-white/10 backdrop-blur">
						<h2 className="text-3xl font-bold mb-6 text-white">Siguiente Paso</h2>
						<p className="text-xl text-light-gray mb-6">
							Chatea con nuestra Agente IA que te ayudará a crear una cita virtual para abrir tu cuenta en XM.
						</p>
						<Button
							onClick={startChat}
							disabled={isChatting}
							className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
						>
							{isChatting ? 'Conectando...' : 'Iniciar Chat con IA'}
						</Button>
					</Card>
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default NextStep;