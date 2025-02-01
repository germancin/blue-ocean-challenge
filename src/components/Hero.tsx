import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SubscriptionForm } from './SubscriptionForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<div className="relative min-h-screen bg-navy overflow-hidden">
			{/* Video Background */}
			<div className="absolute inset-0 w-full h-full">
				<div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy/90 z-10" />
				<video autoPlay muted loop playsInline className="w-full h-full object-cover">
					<source src="https://cdn.jsdelivr.net/gh/fortraders/web-files/world-cup-hero.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>

			{/* Content */}
			<div className="relative container mx-auto px-4 pt-32 pb-20 z-20">
				<div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-128px)]">
					<div className="text-white space-y-8 animate-fade-in order-1 md:order-1 text-center md:text-left">
						<div className="space-y-4">
							<div className="inline-block bg-bright-blue/20 backdrop-blur-sm px-4 py-2 rounded-full">
								<span className="text-bright-blue font-semibold">{t('hero.tournament')}</span>
							</div>
							<h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-bright-blue to-white bg-clip-text text-transparent animate-pulse">{t('hero.tagline')}</h1>
						</div>
						<div className="flex justify-center md:justify-start space-x-4">
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<DialogTrigger asChild>
									<button className="group relative overflow-hidden bg-bright-blue hover:bg-bright-blue/90 text-white px-8 py-4 rounded-xl flex items-center space-x-2 transition-all duration-300 animate-scale-in font-sans shadow-lg shadow-bright-blue/20">
										<span className="relative z-10 font-semibold">{t('hero.joinEvent')}</span>
										<ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
										<div className="absolute inset-0 bg-gradient-to-r from-bright-blue via-bright-blue/80 to-bright-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10">
									<DialogHeader>
										<DialogTitle className="text-3xl font-bold text-center text-white mb-2">{t('hero.dialogTitle')}</DialogTitle>
									</DialogHeader>
									<div className="mt-4">
										<SubscriptionForm onSuccess={() => setIsDialogOpen(false)} />
										<p className="text-center text-sm text-gray-400 mt-4">{t('hero.dialogDescription')}</p>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					<div className="animate-fade-in order-2 md:order-2 flex justify-center md:justify-start relative">
						<div className="absolute inset-0 bg-gradient-to-r from-bright-blue/20 to-transparent rounded-lg filter blur-3xl" />
						<img src="https://cdn.prod.website-files.com/652e60598eb08a4c5d64a319/66760053164e271e7d0f935b_iweo.avif" alt="Trading Platform Interface" className="relative rounded-lg shadow-2xl w-full transform hover:scale-105 transition-transform duration-300" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
