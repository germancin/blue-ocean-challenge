import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Rules = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t('rules.generalConditions.title'),
      items: [
        {
          title: t('rules.generalConditions.demoAccount.title'),
          description: t('rules.generalConditions.demoAccount.description'),
        },
        {
          title: t('rules.generalConditions.leverage.title'),
          description: t('rules.generalConditions.leverage.description'),
        },
        {
          title: t('rules.generalConditions.duration.title'),
          description: t('rules.generalConditions.duration.description'),
        },
      ],
    },
    {
      title: t('rules.riskManagement.title'),
      items: [
        {
          title: t('rules.riskManagement.maxDrawdown.title'),
          description: t('rules.riskManagement.maxDrawdown.description'),
        },
        {
          title: t('rules.riskManagement.simultaneousOperations.title'),
          description: t('rules.riskManagement.simultaneousOperations.description'),
        },
        {
          title: t('rules.riskManagement.consequence.title'),
          description: t('rules.riskManagement.consequence.description'),
        },
      ],
    },
    {
      title: t('rules.evaluationCriteria.title'),
      items: [
        {
          title: t('rules.evaluationCriteria.finalBalance.title'),
          description: t('rules.evaluationCriteria.finalBalance.description'),
        },
        {
          title: t('rules.evaluationCriteria.ruleCompliance.title'),
          description: t('rules.evaluationCriteria.ruleCompliance.description'),
        },
        {
          title: t('rules.evaluationCriteria.additionalMetrics.title'),
          description: t('rules.evaluationCriteria.additionalMetrics.description'),
        },
        {
          title: t('rules.evaluationCriteria.minimumRequirements.title'),
          description: t('rules.evaluationCriteria.minimumRequirements.description'),
        },
      ],
    },
  ];

  return (
    <section className="py-16 bg-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('rules.title')}</h2>
          <p className="text-xl text-gray-300">{t('rules.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card key={index} className="bg-bright-blue/10 border-bright-blue/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="animate-fade-in" style={{ animationDelay: `${itemIndex * 100}ms` }}>
                      <h4 className="font-semibold text-bright-blue mb-1">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
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