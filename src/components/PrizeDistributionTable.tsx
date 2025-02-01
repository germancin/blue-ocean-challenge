import React from 'react';
import { useTranslation } from 'react-i18next';

const PrizeDistributionTable = () => {
	const { t } = useTranslation();

	const tiers = [
		{
			title: t('tiers.0.title'),
			position: t('tiers.0.position'),
			winners: '3',
			prize: '$2,000 - $500',
			total: '$3,500',
			className: 'bg-gradient-to-br from-yellow-300/20 to-amber-500/20 border-yellow-500/30',
		},
		{
			title: t('tiers.1.title'),
			position: t('tiers.1.position'),
			winners: '7',
			prize: '$250',
			total: '$1,750',
			className: 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-500/30',
		},
		{
			title: t('tiers.2.title'),
			position: t('tiers.2.position'),
			winners: '10',
			prize: '$100',
			total: '$1,000',
			className: 'bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-500/30',
		},
	];

	return (
		<div id="distribution" className="bg-navy py-20 relative overflow-hidden">
			{/* Background image with opacity */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
				style={{
					backgroundImage: "url('/lovable-uploads/f72cf336-f7f5-4f48-b178-7503ef515628.png')",
				}}
			/>

			{/* Overlay gradient */}
			<div className="absolute inset-0 bg-navy/70" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16 animate-fade-in">
					<div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
						<h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t('distributionSectionTitle')}</h2>
					</div>
					<div className="flex items-center justify-center space-x-2">
						<div className="w-12 h-1 bg-bright-blue rounded-full"></div>
						<div className="w-24 h-1 bg-gradient-to-r from-bright-blue to-purple-500 rounded-full"></div>
						<div className="w-12 h-1 bg-purple-500 rounded-full"></div>
					</div>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="grid gap-6 relative">
						{tiers.map((tier, index) => (
							<div
								key={index}
								className={`
                  relative group rounded-xl p-6 sm:p-8 border backdrop-blur-sm
                  transform transition-all duration-300 hover:-translate-y-1
                  ${tier.className}
                  ${index === 0 ? 'w-full sm:w-3/4 mx-auto' : index === 1 ? 'w-full sm:w-5/6 mx-auto' : 'w-full'}
                `}
							>
								{/* Glow effect for top tier */}
								{index === 0 && <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl group-hover:bg-yellow-400/10 transition-all duration-300" />}

								<div className="relative z-10 space-y-4">
									<h3 className="text-3xl font-bold text-white mb-2 text-center">{tier.title}</h3>

									<div className="grid sm:grid-cols-4 gap-4 items-center text-center sm:text-left">
										<div className="text-white">
											<p className="text-base opacity-80 font-medium mb-1">{t('labels.position')}</p>
											<p className="text-xl font-semibold">{tier.position}</p>
										</div>
										<div className="text-white">
											<p className="text-base opacity-80 font-medium mb-1">{t('labels.winners')}</p>
											<p className="text-xl font-semibold">{tier.winners}</p>
										</div>
										<div className="text-white">
											<p className="text-base opacity-80 font-medium mb-1">{t('labels.prize')}</p>
											<p className={`text-xl font-semibold ${index === 0 ? 'text-yellow-400' : ''}`}>{tier.prize}</p>
										</div>
										<div className="text-white">
											<p className="text-base opacity-80 font-medium mb-1">{t('labels.total')}</p>
											<p className="text-xl font-semibold">{tier.total}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrizeDistributionTable;
