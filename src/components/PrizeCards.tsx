import { Trophy, Medal, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PrizeCard from './prizes/PrizeCard';
import BackgroundEffects from './prizes/BackgroundEffects';

const PrizeCards = () => {
  const { t } = useTranslation();

  const getPerks = (key: string): string[] => {
    const perks = t(`prizes.${key}.perks`, { returnObjects: true });
    return Array.isArray(perks) ? perks : [];
  };

  const prizes = [
    {
      icon: <Trophy className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.first.title'),
      cashPrize: "$2,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: getPerks('first')
    },
    {
      icon: <Medal className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.second.title'),
      cashPrize: "$1,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: getPerks('second')
    },
    {
      icon: <Award className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.third.title'),
      cashPrize: "$500",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: getPerks('third')
    }
  ];

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            {t('prizes.title')}
          </h2>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full" />
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