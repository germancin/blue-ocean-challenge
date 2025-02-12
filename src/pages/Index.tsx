import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PrizeCards from '../components/PrizeCards';
import PrizeDistributionTable from '../components/PrizeDistributionTable';
import DiversificationStrategy from '../components/DiversificationStrategy';
import Rules from '../components/Rules';
import InfoChallenge from '../components/InfoChallenge';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { createChat } from '@n8n/chat';
import { useTranslation } from 'react-i18next'; // Assuming you're using i18n for translations

const Index = () => {
	const { t } = useTranslation();

	useEffect(() => {
		// Initialize the chat widget
		createChat({
			i18n: {
				en: {
					title: '',
					subtitle: '',
					footer: '',
					getStarted: t('chatWidgetHome.getStarted'),
					inputPlaceholder: t('chatWidgetHome.inputPlaceholder'),
					error: t('chatWidgetHome.error'),
					closeButtonTooltip: t('chatWidgetHome.closeButtonTooltip'),
					minimizeButtonTooltip: t('chatWidgetHome.minimizeButtonTooltip'),
					maximizeButtonTooltip: t('chatWidgetHome.maximizeButtonTooltip'),
					sendButtonTooltip: t('chatWidgetHome.sendButtonTooltip'),
				},
			},
			initialMessages: [t('chatWidgetHome.initialMessage')],
			showWelcomeScreen: true,
			chatInputKey: 'chatInput',
			webhookUrl: 'https://n8n.elitetraderhub.co/webhook/2af80ca8-518a-409f-b81f-d53e63df12d6/chat',
			target: '#chat-widget',
		});

		setTimeout(() => {
			if (document.querySelector('.chat-button')) {
				document.querySelector('.chat-button').addEventListener('click', function () {
					console.log('Chat button clicked!');
					const targetDiv = document.querySelector('.chat-messages-list');

					const observer = new MutationObserver((mutationsList) => {
						for (const mutation of mutationsList) {
							if (mutation.type === 'childList') {
								for (const node of mutation.addedNodes) {
									if (node.nodeType === Node.ELEMENT_NODE) {
										const lastElement = node as HTMLElement;

										// Verifica si el elemento es mayor a 400px
										if (lastElement.offsetHeight >= 400) {
											const chatBody = document.querySelector('.chat-body');
											if (chatBody) {
												setTimeout(() => {
													// Calcular la posición top relativa del último elemento.
													// offsetTop indica la distancia del elemento al contenedor offsetParent
													// (que podría ser .chat-body si están directamente relacionados).
													const elementOffsetTop = lastElement.offsetTop;

													chatBody.scrollTo({
														top: elementOffsetTop,
														behavior: 'smooth',
													});
												}, 100);
											}
										}
									}
								}
							}
						}
					});

					observer.observe(targetDiv, { childList: true, subtree: true });
				});
			}
		}, 500);
	}, [t]);
	return (
		<main className="min-h-screen bg-light-gray">
			<Navbar />
			<Hero />
			<Rules />
			<InfoChallenge />
			<PrizeDistributionTable />
			<DiversificationStrategy />
			<FAQ />
			<CallToAction />
			<Footer />
		</main>
	);
};

export default Index;
