import { Trophy, Users, BarChart3, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InfoChallenge = () => {
    const { t } = useTranslation();
    return (
        <section id="info-challenge" className="relative py-16 overflow-hidden bg-navy text-center">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: 'url("/lovable-uploads/490f6ed8-97cc-4c95-962d-26d5cac2fda8.png")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#001F3F]/80" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                        <h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                            {t('infoChallenge.sectionTitle', 'Info del Desafío')}
                        </h2> 
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 text-white">
                    <div className="p-6 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
                        <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold">{t('infoChallenge.participants')}</h3>
                        <p className="text-lg">{t('infoChallenge.chance')}</p>
                        <h4 className="text-xl font-bold mt-4">{t('infoChallenge.winners')}</h4>
                    </div>
                    
                    <div className="p-6 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
                        <BarChart3 className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold">{t('infoChallenge.best')}</h3>
                        <p className="text-lg">{t('infoChallenge.stat98')}</p>
                    </div>
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-purple-400/20 to-purple-600/20 border border-purple-500/30 rounded-xl">
                    <h3 className="text-4xl font-bold text-white">{t('infoChallenge.twoPercentTitle')}</h3>
                    <h2 className="text-6xl font-extrabold text-yellow-400 animate-pulse">2%</h2>
                    <h4 className="text-2xl font-semibold text-white">{t('infoChallenge.winnerStats')}</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12 text-white">
                    <div className="p-6 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
                        <BrainCircuit className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold">{t('infoChallenge.changeMindset')}</h3>
                        <p className="text-lg">{t('infoChallenge.noFunding')}</p>
                    </div>
                    
                    <div className="p-6 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg">
                        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold">{t('infoChallenge.entryCost')}</h3>
                        <p className="text-lg">{t('infoChallenge.prizePool')}</p>
                    </div>
                </div>
                
                <div className="mt-12 text-center">
                    <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:scale-105 transition-transform">
                        {t('infoChallenge.ctaButton')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InfoChallenge;