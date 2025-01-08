import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';
import { Trophy, Target, BarChart3, Sparkles } from 'lucide-react';

const Rules = () => {
  const { t } = useTranslation('rules');

  const sections = [
    {
      title: t('generalConditions.title'),
      icon: <Trophy className="w-12 h-12 text-[#00ff94] animate-pulse" />,
      items: [
        {
          title: t('generalConditions.demoAccount.title'),
          description: t('generalConditions.demoAccount.description'),
        },
        {
          title: t('generalConditions.duration.title'),
          description: t('generalConditions.duration.description'),
        },
      ],
    },
    {
      title: t('riskManagement.title'),
      icon: <Target className="w-12 h-12 text-[#ff4d4d] animate-pulse" />,
      items: [
        {
          title: t('riskManagement.maxDrawdown.title'),
          description: t('riskManagement.maxDrawdown.description'),
        },
      ],
    },
    {
      title: t('evaluationCriteria.title'),
      icon: <BarChart3 className="w-12 h-12 text-[#00c8ff] animate-pulse" />,
      items: [
        {
          title: t('evaluationCriteria.finalBalance.title'),
          description: t('evaluationCriteria.finalBalance.description'),
        },
        {
          title: t('evaluationCriteria.ruleCompliance.title'),
          description: t('evaluationCriteria.ruleCompliance.description'),
        },
        {
          title: t('evaluationCriteria.additionalMetrics.title'),
          description: t('evaluationCriteria.additionalMetrics.description'),
        },
        {
          title: t('evaluationCriteria.minimumRequirements.title'),
          description: t('evaluationCriteria.minimumRequirements.description'),
        },
      ],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Trading chart background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/e9c136b6-a734-4836-a50b-e8984f715f89.png")',
          filter: 'brightness(0.7) contrast(1.2)'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000B14]/95 via-[#001A2C]/90 to-[#003366]/85" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute h-2 w-2 bg-[#00ff94] rounded-full top-1/4 left-1/4 animate-ping" />
        <div className="absolute h-2 w-2 bg-[#ff4d4d] rounded-full top-3/4 right-1/4 animate-ping delay-300" />
        <div className="absolute h-2 w-2 bg-[#00c8ff] rounded-full bottom-1/4 left-1/2 animate-ping delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header section with glowing effect */}
        <div className="text-center mb-16 relative">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#00ff94] animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff94] via-[#00c8ff] to-[#ff4d4d] animate-pulse">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff94] via-[#00c8ff] to-[#ff4d4d] mx-auto mt-8 rounded-full" />
        </div>

        {/* Cards grid with glassmorphism effect */}
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-black/20 backdrop-blur-xl border-[#00ff94]/20 hover:border-[#00ff94]/40"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff94]/20 via-[#00c8ff]/20 to-[#ff4d4d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-[#00ff94] transition-colors duration-300">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="animate-fade-in"
                        style={{ animationDelay: `${itemIndex * 100}ms` }}
                      >
                        <h4 className="font-semibold text-[#00c8ff] mb-2 group-hover:text-[#00ff94] transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;