import React from "react";

const PrizeDistributionTable = () => {
  const tiers = [
    {
      title: "Top Winners",
      position: "1st - 3rd Place",
      winners: "3",
      prize: "$2,000 - $500",
      total: "$3,500",
      className: "bg-gradient-to-br from-yellow-300/20 to-amber-500/20 border-yellow-500/30"
    },
    {
      title: "Strong Performers",
      position: "4th - 10th Place",
      winners: "7",
      prize: "$250",
      total: "$1,750",
      className: "bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-500/30"
    },
    {
      title: "Honorable Mentions",
      position: "11th - 20th Place",
      winners: "10",
      prize: "$100",
      total: "$1,000",
      className: "bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-500/30"
    }
  ];

  return (
    <div className="bg-navy py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,123,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            Prize Distribution
          </h2>
          <p className="text-white text-xl mb-8">
            Total Prize Pool: $6,250
          </p>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 relative">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`
                  relative group rounded-xl p-8 border backdrop-blur-sm
                  transform transition-all duration-300 hover:-translate-y-1
                  ${tier.className}
                  ${index === 0 ? 'w-3/4 mx-auto' : index === 1 ? 'w-5/6 mx-auto' : 'w-full'}
                `}
              >
                {/* Glow effect for top tier */}
                {index === 0 && (
                  <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl group-hover:bg-yellow-400/10 transition-all duration-300" />
                )}
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tier.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="text-white">
                      <p className="text-sm opacity-70">Position</p>
                      <p className="font-semibold">{tier.position}</p>
                    </div>
                    <div className="text-white">
                      <p className="text-sm opacity-70">Winners</p>
                      <p className="font-semibold">{tier.winners}</p>
                    </div>
                    <div className="text-white">
                      <p className="text-sm opacity-70">Prize</p>
                      <p className={`font-semibold ${index === 0 ? 'text-yellow-400' : ''}`}>
                        {tier.prize}
                      </p>
                    </div>
                    <div className="text-white">
                      <p className="text-sm opacity-70">Total</p>
                      <p className="font-semibold">{tier.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeDistributionTable;