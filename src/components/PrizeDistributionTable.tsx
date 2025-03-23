import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, CalendarCheck } from 'lucide-react';

const PrizeDistributionTable = () => {
	const { t } = useTranslation();

	const winnersTable = [
		{ position: '🥇 1°', winners: '1', prize: '$2,000', total: '$2,000' },
		{ position: '🥈 2°', winners: '1', prize: '$1,000', total: '$1,000' },
		{ position: '🥉 3°', winners: '1', prize: '$500', total: '$500' },
		{ position: '4°-5°', winners: '14', prize: '$300', total: '$4,200' },
	];

	return (
		<div id="distribution" className="bg-navy py-20 relative overflow-hidden">
			<div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundImage: "url('/lovable-uploads/f72cf336-f7f5-4f48-b178-7503ef515628.png')" }} />
			<div className="absolute inset-0 bg-navy/70" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16 animate-fade-in">
					<div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 transition duration-1000"></div>
						<h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t('participation.sectionTitle')}</h2>
					</div>
				</div>

				<div className="max-w-4xl mx-auto text-center text-white p-6 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
					<CalendarCheck className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
					<h3 className="text-3xl font-semibold">{t('participation.feeTitle')}</h3>
					<p className="text-lg mt-4">{t('participation.description')}</p>
				</div>

				<div className="mt-12 text-center text-white">
					<h3 className="text-4xl font-bold text-yellow-300 animate-pulse">{t('participation.neverSeen')}</h3>
					<p className="text-2xl mt-4">{t('participation.winningChance')}</p>
				</div>

				<div className="mt-12 text-center text-white p-8 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
					<Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
					<h3 className="text-3xl font-semibold">{t('participation.winnersTableTitle')}</h3>
					<div className="overflow-x-auto mt-6">
						<table className="w-full border-collapse border border-white/20">
							<thead>
								<tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
									<th className="p-3 border border-white/20">{t('table.position')}</th>
									<th className="p-3 border border-white/20">{t('table.winners')}</th>
									<th className="p-3 border border-white/20">{t('table.prize')}</th>
									<th className="p-3 border border-white/20">{t('table.total')}</th>
								</tr>
							</thead>
							<tbody>
								{winnersTable.map((row, index) => (
									<tr key={index} className="border border-white/20">
										<td className="p-3 text-white text-center">{row.position}</td>
										<td className="p-3 text-white text-center">{row.winners}</td>
										<td className="p-3 text-yellow-400 text-center">{row.prize}</td>
										<td className="p-3 text-white text-center">{row.total}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrizeDistributionTable;
