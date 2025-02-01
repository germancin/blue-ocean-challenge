import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './../global.css';
import { set } from 'date-fns';

const NextStep = () => {
	const location = useLocation();
	const [showConfetti, setShowConfetti] = useState(true);
	const [name, setName] = useState(location.state?.name ?? null);
	const [email, setEmail] = useState(location.state?.email ?? null);
	const [sessionId, setSessionid] = useState('');

	useEffect(() => {
		if (name && email) {
			setName(name);
			setEmail(email);
		}
	}, [name, email]);

	useEffect(() => {
		// Hide confetti after 5 seconds
		const timer = setTimeout(() => {
			setShowConfetti(false);
		}, 5000);

		// Initialize the chat widget
		createChat({
			i18n: {
				en: {
					title: '',
					subtitle: '',
					footer: '',
					getStarted: 'Crear mi cita virtual',
					inputPlaceholder: 'Escribir...',
					error: 'An error occurred. Please try again.',
					closeButtonTooltip: 'Close',
					minimizeButtonTooltip: 'Minimize',
					maximizeButtonTooltip: 'Maximize',
					sendButtonTooltip: 'Send',
				},
			},
			initialMessages: [`Bienvenido saluda a Sofia,`],
			showWelcomeScreen: true,
			mode: 'fullscreen',
			chatInputKey: 'chatInput',
			webhookUrl: 'https://n8n.elitetraderhub.co/webhook/186e067f-c698-483e-88dc-347c59530e55/chat',
			target: '#chat-widget',
		});

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (sessionId) {
			setTimeout(() => {
				sendInitialMessage(sessionId);
			}, 500);
		}

		const chatBody = document.querySelector('.chat-layout .chat-body');
		if (chatBody) {
			chatBody.setAttribute('style', 'max-height: 450px !important; overflow-y: scroll !important; ');
		}

		return () => {
			sendInitialMessage(''); // Example of clearing data associated with sessionId
		};
	}, [sessionId]);

	// Send the initial message once sessionId is captured
	const sendInitialMessage = (sessionId) => {
		if (sessionId) {
			const initialMessage = {
				chatInput: 'Durante nuestra interaccion te referiras a mi como German G. y mi correo electronico es elmaildegerman@gmail.com guardalo en tu memoria.',
				sessionId: sessionId, // Pass the captured sessionId
			};

			// Post the message to the webhook endpoint
			fetch('https://n8n.elitetraderhub.co/webhook/186e067f-c698-483e-88dc-347c59530e55/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(initialMessage),
			})
				.then((response) => response.json())
				.then((data) => console.log('Initial message sent successfully:', data))
				.catch((error) => console.error('Error sending initial message:', error));
		}
	};

	// Intercept fetch to capture sessionId
	const originalFetch = window.fetch;
	window.fetch = async (...args) => {
		const [resource, config] = args;

		// If this is the webhook request, inspect the payload
		if (typeof resource === 'string' && resource.includes('https://n8n.elitetraderhub.co/webhook')) {
			if (config && typeof config.body === 'string' && config.body) {
				const payload = JSON.parse(config.body);

				// Check if sessionId is present and capture it
				if (payload.sessionId) {
					console.log('sessionId capturado:', payload.sessionId);
					if (!sessionId) {
						setSessionid(payload.sessionId);
					}
				}
			}
		}

		// Call the original fetch
		return originalFetch(...args);
	};

	if (!name && !email) {
		window.location.href = '/';
	}

	return (
		<main className="min-h-screen bg-navy relative">
			{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={200} gravity={0.3} />}
			<Navbar />
			<div className="container mx-auto px-4 py-24">
				<div className="max-w-3xl mx-auto space-y-12">
					{/* Step 1: Payment Confirmation */}
					{/* <Card className="p-8 bg-white/10 backdrop-blur animate-fade-in">
						<h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">¡Felicidades! 🎉</h2>
						<p className="text-xl text-light-gray mb-4">Has completado exitosamente tu pago y ahora eres parte del torneo de trading con nosotros.</p>
						{paymentId && <p className="text-sm text-light-gray/80">ID de Pago: {paymentId}</p>}
					</Card> */}

					{/* Step 2: AI Chat */}
					{name && email ? (
						<Card className="p-8 bg-white/10 backdrop-blur animate-fade-in delay-300">
							<h2 className="text-2xl font-bold mb-6 text-white flex items-center justify-center gap-2">¡Felicidades! 🎉</h2>
							<h2 className="text-2xl font-bold mb-1 text-white">Siguiente Paso</h2>
							<p className="text-light-gray mb-">Chatea con nuestra Agente IA que te ayudará a crear una cita virtual para abrir tu cuenta en XM.</p>
							<div id="chat-widget" className="mt-6 min-h-[570px] rounded-lg bg-white/5 p-4">
								{/* Chat widget will be injected here */}
							</div>
						</Card>
					) : (
						<div className="min-h-screen flex items-center justify-center">
							<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default NextStep;
