import { useTranslation } from 'react-i18next';
import { Trophy, Target, BarChart3 } from 'lucide-react';

const Rules = () => {
  const { t } = useTranslation('rules');

  return (
    <section className="relative py-16 overflow-hidden bg-navy">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/e9c136b6-a734-4836-a50b-e8984f715f89.png")',
          filter: 'brightness(0.7) contrast(1.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-[#001F3F]/85" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff94] via-[#00c8ff] to-[#ff4d4d]">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 mb-16 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00ff94] to-[#00c8ff] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00ff94] rounded-full animate-pulse" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#00ff94]/20 group-hover:border-[#00ff94]/40 transition-all duration-300">
              <Trophy className="w-12 h-12 text-[#00ff94] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('generalConditions.title')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-[#00ff94] font-semibold">{t('generalConditions.demoAccount.title')}</h4>
                  <p className="text-gray-300">{t('generalConditions.demoAccount.description')}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[#00ff94] font-semibold">{t('generalConditions.duration.title')}</h4>
                  <p className="text-gray-300">{t('generalConditions.duration.description')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-8 mb-16 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00c8ff] to-[#ff4d4d] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00c8ff] rounded-full animate-pulse" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#00c8ff]/20 group-hover:border-[#00c8ff]/40 transition-all duration-300">
              <Target className="w-12 h-12 text-[#00c8ff] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('riskManagement.title')}</h3>
              <div className="space-y-2">
                <h4 className="text-[#00c8ff] font-semibold">{t('riskManagement.maxDrawdown.title')}</h4>
                <p className="text-gray-300">{t('riskManagement.maxDrawdown.description')}</p>
              </div>
            </div>
          </div>

          <div className="relative pl-8 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#ff4d4d] to-[#00ff94] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#ff4d4d] rounded-full animate-pulse" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#ff4d4d]/20 group-hover:border-[#ff4d4d]/40 transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-[#ff4d4d] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('evaluationCriteria.title')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">{t('evaluationCriteria.finalBalance.title')}</h4>
                    <p className="text-gray-300">{t('evaluationCriteria.finalBalance.description')}</p>
                  </div>
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">{t('evaluationCriteria.ruleCompliance.title')}</h4>
                    <p className="text-gray-300">{t('evaluationCriteria.ruleCompliance.description')}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">{t('evaluationCriteria.additionalMetrics.title')}</h4>
                    <p className="text-gray-300">{t('evaluationCriteria.additionalMetrics.description')}</p>
                  </div>
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">{t('evaluationCriteria.minimumRequirements.title')}</h4>
                    <p className="text-gray-300">{t('evaluationCriteria.minimumRequirements.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;