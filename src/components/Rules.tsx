import { DollarSign, Settings, TrendingUp, Clock, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SubscriptionForm } from './SubscriptionForm';

const Rules = () => {
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <section id="rules" className="relative py-16 overflow-hidden bg-navy">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: 'url("/lovable-uploads/7cec8cef-9c5b-423c-9299-4f44b4430fb1.png")',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#001F3F]/80" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
						<h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t('rules.sectionTitle')}</h2>
					</div>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: <DollarSign className="w-12 h-12 text-bright-blue mb-4 mx-auto" />, text: t('rules.depositMinimum') },
                        { icon: <DollarSign className="w-12 h-12 text-green-400 mb-4 mx-auto" />, text: t('rules.dropdownMinimum') }
                    ].map((rule, index) => (
                        <div key={index} className="relative pl-8 group hover:bg-gray-800 transition duration-300 p-6 rounded-lg border border-gray-700 text-center cursor-pointer">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00ff94] to-[#00c8ff] rounded-full" />
                            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00ff94] rounded-full" />
                            {rule.icon}
                            <p className="text-lg font-semibold text-white">{rule.text}</p>
                        </div>
                    ))}
                </div>

                
               
            </div>
		

            <div className="container mx-auto px-4 relative z-10 mt-10">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="relative inline-block">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
						<h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t('rules.beneficiostitle')}</h2>
					</div>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: <DollarSign className="w-12 h-12 text-green-400 mb-4 mx-auto" />, text: t('rules.depositMaximum') },
                        { icon: <Settings className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />, text: t('rules.customConditions') },
                        { icon: <TrendingUp className="w-12 h-12 text-purple-400 mb-4 mx-auto" />, text: t('rules.anyTrades') },
                        { icon: <Settings className="w-12 h-12 text-teal-400 mb-4 mx-auto" />, text: t('rules.allMarkets') }
                    ].map((rule, index) => (
                        <div key={index} className="relative pl-8 group hover:bg-gray-800 transition duration-300 p-6 rounded-lg border border-gray-700 text-center cursor-pointer">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00ff94] to-[#00c8ff] rounded-full" />
                            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00ff94] rounded-full" />
                            {rule.icon}
                            <p className="text-lg font-semibold text-white">{rule.text}</p>
                        </div>
                    ))}
                </div>

               
                <div className="text-center mt-8 relative group rounded-xl p-6 sm:p-8 border backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-500/30 w-full">
                    <p className="text-lg font-semibold text-white">{t('rules.riskManagement')}</p>
                </div>
                
                {/* Dialog para el botón CTA */}
                <div className="text-center mt-12">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:scale-105 transition-transform">
                                {t('rules.ctaButton')}
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold text-center text-white mb-2">
                                    {t('hero.dialogTitle')}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                <SubscriptionForm onSuccess={() => setIsDialogOpen(false)} />
                                <p className="text-center text-sm text-gray-400 mt-4">
                                    {t('hero.dialogDescription')}
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>		
			
			
        </section>
    );
};

export default Rules;
