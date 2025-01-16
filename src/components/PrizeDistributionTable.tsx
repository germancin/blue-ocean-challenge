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
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('/lovable-uploads/f72cf336-f7f5-4f48-b178-7503ef515628.png')",
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-navy/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white font-display mb-4">
            Prize Distribution
          </h2>
          <p className="text-2xl text-white mb-8 font-medium">
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
                  relative group rounded-xl p-6 sm:p-8 border backdrop-blur-sm
                  transform transition-all duration-300 hover:-translate-y-1
                  ${tier.className}
                  ${index === 0 ? 'w-full sm:w-3/4 mx-auto' : index === 1 ? 'w-full sm:w-5/6 mx-auto' : 'w-full'}
                `}
              >
                {/* Glow effect for top tier */}
                {index === 0 && (
                  <div className="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl group-hover:bg-yellow-400/10 transition-all duration-300" />
                )}
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2 text-center">
                    {tier.title}
                  </h3>
                  
                  <div className="grid sm:grid-cols-4 gap-4 items-center text-center sm:text-left">
                    <div className="text-white">
                      <p className="text-base opacity-80 font-medium mb-1">Position</p>
                      <p className="text-xl font-semibold">{tier.position}</p>
                    </div>
                    <div className="text-white">
                      <p className="text-base opacity-80 font-medium mb-1">Winners</p>
                      <p className="text-xl font-semibold">{tier.winners}</p>
                    </div>
                    <div className="text-white">
                      <p className="text-base opacity-80 font-medium mb-1">Prize</p>
                      <p className={`text-xl font-semibold ${index === 0 ? 'text-yellow-400' : ''}`}>
                        {tier.prize}
                      </p>
                    </div>
                    <div className="text-white">
                      <p className="text-base opacity-80 font-medium mb-1">Total</p>
                      <p className="text-xl font-semibold">{tier.total}</p>
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