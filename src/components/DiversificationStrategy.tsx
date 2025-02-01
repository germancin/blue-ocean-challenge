import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Wallet, BarChart3 } from 'lucide-react';

const DiversificationStrategy = () => {
	const { t } = useTranslation();

	const strategies = [
		{
			icon: <Wallet className="w-16 h-16 text-white mb-4" />,
			title: t('strategy.cryptoTitle'),
			description: t('strategy.cryptoDescription'),
		},
	];

	return (
		<div id="strategy" className="relative bg-navy py-20 overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center opacity-50 brightness-[0.2]"
				style={{
					backgroundImage: 'url("/lovable-uploads/490f6ed8-97cc-4c95-962d-26d5cac2fda8.png")',
				}}
			/>
			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16 animate-fade-in">
					<div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
						<h2 className="relative text-3xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t('strategy.sectionTitle')}</h2>
					</div>
				</div>
				<div className="flex justify-center">
					{strategies.map((strategy, index) => (
						<div key={index} className="bg-navy/50 p-8 pt-8 pb-0 rounded-lg border border-white/10 backdrop-blur-sm hover:border-bright-blue/50 transition-all duration-300 flex flex-col" style={{ width: '50%' }}>
							<div className="flex flex-col items-center text-center flex-grow">
								{strategy.icon}
								<h3 className="text-2xl font-semibold mb-4 text-bright-blue">{strategy.title}</h3>
								<p className="text-white/80 mb-8" style={{ fontSize: '18px' }}>
									{strategy.description}
								</p>
							</div>
							<div className="-mx-8 -mb-[1px]">
								<img src={index === 2 ? '/lovable-uploads/3406221e-b8b1-4f5a-8950-831c6354f0e9.png' : index === 1 ? '/lovable-uploads/c936bd0d-019f-48d0-923d-64fa1671eaf1.png' : '/lovable-uploads/e1a1adda-f688-4160-9548-0535dbf1afd2.png'} alt="Trading Interface" className="w-full rounded-b-lg hover:opacity-90 transition-opacity duration-300" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DiversificationStrategy;
