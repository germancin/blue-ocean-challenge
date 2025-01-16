import { Trophy, Medal, Award } from 'lucide-react';
import PrizeCard from './prizes/PrizeCard';
import BackgroundEffects from './prizes/BackgroundEffects';

const PrizeCards = () => {
	const prizes = [
		{
			icon: <Trophy className="w-16 h-16 text-bright-blue" />,
			place: 'First Place',
			cashPrize: '$2,000',
			challenge: '$100,000',
			challengeType: 'Trading Challenge Account',
			perks: ['Direct access to live trading', 'Personal trading mentor', 'Premium analytics tools'],
		},
		{
			icon: <Medal className="w-16 h-16 text-bright-blue" />,
			place: 'Second Place',
			cashPrize: '$1,000',
			challenge: '$100,000',
			challengeType: 'Trading Challenge Account',
			perks: ['Fast-track to live trading', 'Group mentoring sessions', 'Basic analytics package'],
		},
		{
			icon: <Award className="w-16 h-16 text-bright-blue" />,
			place: 'Third Place',
			cashPrize: '$500',
			challenge: '$100,000',
			challengeType: 'Trading Challenge Account',
			perks: ['Accelerated evaluation', 'Trading workshop access', 'Basic tools package'],
		},
	];

	return (
		<div id="prizes" className="relative bg-navy py-20 overflow-hidden">
			<BackgroundEffects />

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16 animate-fade-in">
					<div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
						<h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">--Prize Pool Distribution-</h2>
					</div>
					<div className="flex items-center justify-center space-x-2">
						<div className="w-12 h-1 bg-bright-blue rounded-full"></div>
						<div className="w-24 h-1 bg-gradient-to-r from-bright-blue to-purple-500 rounded-full"></div>
						<div className="w-12 h-1 bg-purple-500 rounded-full"></div>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{prizes.map((prize, index) => (
						<PrizeCard key={index} {...prize} />
					))}
				</div>
			</div>
		</div>
	);
};

export default PrizeCards;
