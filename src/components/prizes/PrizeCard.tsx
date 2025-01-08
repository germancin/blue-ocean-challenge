import { LucideIcon } from 'lucide-react';

interface PrizeCardProps {
  icon: React.ReactNode;
  place: string;
  cashPrize: string;
  challenge: string;
  challengeType: string;
  perks: string[];
}

const PrizeCard = ({ icon, place, cashPrize, challenge, challengeType, perks = [] }: PrizeCardProps) => {
  return (
    <div className="relative group bg-black border border-bright-blue/20 rounded-xl p-8 hover:border-bright-blue/50 transition-all duration-300 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative space-y-6">
        <div className="flex justify-center">
          {icon}
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-bright-blue">
            {place}
          </h3>
          
          <div className="text-white">
            <p className="text-xl font-semibold">{cashPrize} cash prize</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[#00FF00] text-2xl font-bold">
              {challenge}
            </p>
            <p className="text-[#00FF00] text-sm">
              {challengeType}
            </p>
          </div>
          
          <div className="text-white space-y-1">
            {Array.isArray(perks) && perks.map((perk, index) => (
              <p key={index} className="text-lg">
                {perk}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;