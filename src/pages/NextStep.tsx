import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { useState, useEffect, useMemo } from 'react';
import Confetti from 'react-confetti';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './../global.css';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';

const NextStep = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const [showConfetti, setShowConfetti] = useState(true);
	const [name, setName] = useState(location.state?.name ?? 'German');
	const [email, setEmail] = useState(location.state?.email ?? 'elmaildegerman@gmail.com');
	const [sessionId, setSessionid] = useState(null);
	const [messageSent, setMessageSent] = useState(false);

	if (document.querySelector('.chat-button')) {
		document.querySelector('.chat-button').addEventListener('click', function () {
			console.log('Chat button clicked!');
			const targetDiv = document.querySelector('.chat-messages-list');

			const observer = new MutationObserver((mutationsList) => {
				mutationsList.forEach(({ type, addedNodes }) => {
					if (type === 'childList' && addedNodes.length > 0) {
						const lastElement = addedNodes[addedNodes.length - 1];
						// Check if the added node is an element and meets the height condition
						if (lastElement.nodeType === Node.ELEMENT_NODE && (lastElement as HTMLElement).offsetHeight >= 400) {
							const chatBody = document.querySelector('.chat-body');
							if (chatBody) {
								setTimeout(() => {
									chatBody.scrollTo({
										top: 350,
										behavior: 'smooth',
									});
								}, 100);
							}
						}
					}
				});
			});

			observer.observe(targetDiv, { childList: true, subtree: true });
		});
	}

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

	const initialMessage = useMemo(() => {
		if (sessionId) {
			return {
				chatInput: `During our interaction, you will refer to me as ${name}, and my email is ${email}. Save it in your memory.`,
				sessionId,
			};
		}

		return null;
	}, [sessionId, name, email]);

	useEffect(() => {
		const sendInitialMessage = (sessionId: string) => {
			if (sessionId && !messageSent) {
				fetch('https://n8n.elitetraderhub.co/webhook/186e067f-c698-483e-88dc-347c59530e55/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(initialMessage),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log('Initial message sent successfully:', data);
						setMessageSent(true);
					})
					.catch((error) => console.error('Error sending initial message:', error));
			}
		};

		if (sessionId) {
			setTimeout(() => {
				sendInitialMessage(sessionId);
			}, 100);
		}

		const chatBody = document.querySelector('.chat-layout .chat-body');
		if (chatBody) {
			chatBody.setAttribute('style', 'max-height: 450px !important; ');
		}

		return () => {
			sendInitialMessage('');
		};
	}, [sessionId, initialMessage, messageSent]);

	useEffect(() => {
		const originalFetch = window.fetch;
		window.fetch = async (...args) => {
			const [resource, config] = args;

			if (typeof resource === 'string' && resource.includes('https://n8n.elitetraderhub.co/webhook')) {
				if (config && typeof config.body === 'string' && config.body) {
					const payload = JSON.parse(config.body);
					if (payload.sessionId) {
						// console.log('Session ID captured:', payload.sessionId);
						if (!sessionId) {
							setSessionid((prev) => {
								if (!prev && prev !== payload.sessionId) {
									return payload.sessionId;
								}
								return null;
							});
						}
					}
				}
			}

			return originalFetch(...args);
		};
	});

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
