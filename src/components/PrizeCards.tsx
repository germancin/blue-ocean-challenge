import { Trophy, Medal, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrizeCards = () => {
  const { t } = useTranslation();

  const prizes = [
    {
      icon: <Trophy className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.first.title'),
      cashPrize: "$2,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: t('prizes.first.perks', { returnObjects: true }) as string[]
    },
    {
      icon: <Medal className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.second.title'),
      cashPrize: "$1,000",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: t('prizes.second.perks', { returnObjects: true }) as string[]
    },
    {
      icon: <Award className="w-16 h-16 text-bright-blue" />,
      place: t('prizes.third.title'),
      cashPrize: "$500",
      challenge: "$100,000",
      challengeType: t('prizes.challenge'),
      perks: t('prizes.third.perks', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/lovable-uploads/2eca4db5-1876-4e6d-986b-871fcd2f75f2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Parallel Effect - Background Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1 bg-bright-blue transform -skew-x-45"
            style={{ left: `${i * 15}%` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            Prizes
          </h2>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="relative group bg-black border border-bright-blue/20 rounded-xl p-8 hover:border-bright-blue/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                <div className="flex justify-center">
                  {prize.icon}
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-bright-blue">
                    {prize.place}
                  </h3>
                  
                  <div className="text-white">
                    <p className="text-xl font-semibold">{prize.cashPrize} cash prize</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[#00FF00] text-2xl font-bold">
                      {prize.challenge}
                    </p>
                    <p className="text-[#00FF00] text-sm">
                      {prize.challengeType}
                    </p>
                  </div>
                  
                  <div className="text-white space-y-1">
                    {prize.perks.map((perk: string, perkIndex: number) => (
                      <p key={perkIndex} className="text-lg">
                        {perk}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrizeCards;