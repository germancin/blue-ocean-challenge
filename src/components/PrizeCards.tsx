import { Trophy, Medal, Award } from 'lucide-react';
import PrizeCard from './prizes/PrizeCard';
import BackgroundEffects from './prizes/BackgroundEffects';

const PrizeCards = () => {
  const prizes = [
    {
      icon: <Trophy className="w-16 h-16 text-bright-blue" />,
      place: "First Place",
      cashPrize: "$2,000",
      challenge: "$100,000",
      challengeType: "Trading Challenge Account",
      perks: [
        "Direct access to live trading",
        "Personal trading mentor",
        "Premium analytics tools"
      ]
    },
    {
      icon: <Medal className="w-16 h-16 text-bright-blue" />,
      place: "Second Place",
      cashPrize: "$1,000",
      challenge: "$100,000",
      challengeType: "Trading Challenge Account",
      perks: [
        "Fast-track to live trading",
        "Group mentoring sessions",
        "Basic analytics package"
      ]
    },
    {
      icon: <Award className="w-16 h-16 text-bright-blue" />,
      place: "Third Place",
      cashPrize: "$500",
      challenge: "$100,000",
      challengeType: "Trading Challenge Account",
      perks: [
        "Accelerated evaluation",
        "Trading workshop access",
        "Basic tools package"
      ]
    }
  ];

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            Prize Pool Distribution
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