import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './../global.css';
import { useTranslation } from 'react-i18next';

const NextStep = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const [showConfetti, setShowConfetti] = useState(true);
	const [name, setName] = useState(location.state?.name ?? null);
	const [email, setEmail] = useState(location.state?.email ?? null);
	const [sessionId, setSessionid] = useState('');

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
					getStarted: t('chatWidget.getStarted'),
					inputPlaceholder: t('chatWidget.inputPlaceholder'),
					error: t('chatWidget.error'),
					closeButtonTooltip: t('chatWidget.closeButtonTooltip'),
					minimizeButtonTooltip: t('chatWidget.minimizeButtonTooltip'),
					maximizeButtonTooltip: t('chatWidget.maximizeButtonTooltip'),
					sendButtonTooltip: t('chatWidget.sendButtonTooltip'),
				},
			},
			initialMessages: [t('chatWidget.initialMessage')],
			showWelcomeScreen: true,
			mode: 'fullscreen',
			chatInputKey: 'chatInput',
			webhookUrl: 'https://n8n.elitetraderhub.co/webhook/186e067f-c698-483e-88dc-347c59530e55/chat',
			target: '#chat-widget',
		});

		return () => clearTimeout(timer);
	}, [t]);

	useEffect(() => {
		const sendInitialMessage = (sessionId: string) => {
			if (sessionId) {
				const initialMessage = {
					chatInput: `During our interaction, you will refer to me as ${name}, and my email is ${email} Save it in your memory.`,
					sessionId,
				};

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
			sendInitialMessage('');
		};
	}, [sessionId]);

	const originalFetch = window.fetch;
	window.fetch = async (...args) => {
		const [resource, config] = args;

		if (typeof resource === 'string' && resource.includes('https://n8n.elitetraderhub.co/webhook')) {
			if (config && typeof config.body === 'string' && config.body) {
				const payload = JSON.parse(config.body);
				if (payload.sessionId) {
					console.log('Session ID captured:', payload.sessionId);
					if (!sessionId) {
						setSessionid(payload.sessionId);
					}
				}
			}
		}

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
					{name && email ? (
						<Card className="p-8 bg-white/10 backdrop-blur animate-fade-in delay-300">
							<h2 className="text-2xl font-bold mb-6 text-white flex items-center justify-center gap-2">{t('nextStep.chatTitle')}</h2>
							<h2 className="text-2xl font-bold mb-1 text-white">{t('nextStep.nextStepTitle')}</h2>
							<p className="text-light-gray">{t('nextStep.chatDescription')}</p>
							<div id="chat-widget" className="mt-6 min-h-[570px] rounded-lg bg-white/5 p-4"></div>
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
