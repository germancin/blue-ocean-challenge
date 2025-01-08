import { Trophy, Medal, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PrizeCard from './prizes/PrizeCard';
import BackgroundEffects from './prizes/BackgroundEffects';

const PrizeCards = () => {
  const { t } = useTranslation();

  const prizes = [
    {
      icon: <Trophy className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.first.title', 'First Place'),
      cashPrize: "$2,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge', 'Trading Challenge Account'),
      perks: [
        t('prizes.first.perks.0', 'Direct access to live trading'),
        t('prizes.first.perks.1', 'Personal trading mentor'),
        t('prizes.first.perks.2', 'Premium analytics tools')
      ]
    },
    {
      icon: <Medal className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.second.title', 'Second Place'),
      cashPrize: "$1,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge', 'Trading Challenge Account'),
      perks: [
        t('prizes.second.perks.0', 'Fast-track to live trading'),
        t('prizes.second.perks.1', 'Group mentoring sessions'),
        t('prizes.second.perks.2', 'Basic analytics package')
      ]
    },
    {
      icon: <Award className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.third.title', 'Third Place'),
      cashPrize: "$500",
      challenge: "$100,000",
      challengeType: t('prizes.challenge', 'Trading Challenge Account'),
      perks: [
        t('prizes.third.perks.0', 'Accelerated evaluation'),
        t('prizes.third.perks.1', 'Trading workshop access'),
        t('prizes.third.perks.2', 'Basic tools package')
      ]
    }
  ];

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            {t('prizes.title', 'Prize Pool Distribution')}
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