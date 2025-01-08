import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trophy, Target, BarChart3 } from 'lucide-react';

const Rules = () => {
  const { t } = useTranslation('rules');

  const sections = [
    {
      title: t('generalConditions.title'),
      icon: <Trophy className="w-12 h-12 text-yellow-400 animate-bounce" />,
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
      icon: <Target className="w-12 h-12 text-emerald-400 animate-pulse" />,
      items: [
        {
          title: t('riskManagement.maxDrawdown.title'),
          description: t('riskManagement.maxDrawdown.description'),
        },
      ],
    },
    {
      title: t('evaluationCriteria.title'),
      icon: <BarChart3 className="w-12 h-12 text-purple-400 animate-bounce" />,
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
    <section className="py-16 bg-gradient-to-br from-navy via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-emerald-500 rounded-full filter blur-3xl animate-pulse delay-2000" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-lg border-none hover:transform hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {section.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${itemIndex * 100}ms` }}
                    >
                      <h4 className="font-semibold text-bright-blue mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;