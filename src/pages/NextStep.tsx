import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const NextStep = () => {
	const location = useLocation();
	const [showConfetti, setShowConfetti] = useState(true);
	const paymentId = location.state?.paymentId;

	useEffect(() => {
		// Hide confetti after 5 seconds
		const timer = setTimeout(() => {
			setShowConfetti(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<main className="min-h-screen bg-navy relative">
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					recycle={true}
					numberOfPieces={200}
					gravity={0.3}
				/>
			)}
			<Navbar />
			<div className="container mx-auto px-4 py-24">
				<div className="max-w-3xl mx-auto space-y-12">
					{/* Step 1: Payment Confirmation */}
					<Card className="p-8 bg-white/10 backdrop-blur animate-fade-in">
						<h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
							¡Felicidades! 🎉
						</h2>
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
					<Card className="p-8 bg-white/10 backdrop-blur animate-fade-in delay-300">
						<h2 className="text-3xl font-bold mb-6 text-white">Siguiente Paso</h2>
						<p className="text-xl text-light-gray mb-6">
							Chatea con nuestra Agente IA que te ayudará a crear una cita virtual para abrir tu cuenta en XM.
						</p>
						<div id="chat-widget" className="mt-6 min-h-[400px] rounded-lg bg-white/5 p-4">
							{/* Chat widget will be injected here */}
						</div>
					</Card>
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default NextStep;