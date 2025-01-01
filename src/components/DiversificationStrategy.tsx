import { LineChart, Wallet, BarChart3 } from 'lucide-react';

const DiversificationStrategy = () => {
  const strategies = [
    {
      icon: <LineChart className="w-16 h-16 text-bright-blue" />,
      title: "Forex",
      description: "Maximum 5 simultaneous positions in currency pairs.",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-bright-blue" />,
      title: "Indices",
      description: "Up to 5 open positions in stock market indices at the same time.",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    },
    {
      icon: <Wallet className="w-16 h-16 text-bright-blue" />,
      title: "Cryptocurrencies",
      description: "5 simultaneous positions allowed in the crypto market.",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    }
  ];

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy"
          style={{
            backgroundImage: 'url("/lovable-uploads/2eca4db5-1876-4e6d-986b-871fcd2f75f2.png")',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Diversification: Mandatory Strategy
          </h2>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="group relative bg-navy/50 backdrop-blur-sm border border-bright-blue/20 rounded-xl p-8 hover:border-bright-blue/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                <div className="flex justify-center">
                  {strategy.icon}
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-bright-blue">
                    {strategy.title}
                  </h3>
                  
                  <p className="text-white text-lg">
                    {strategy.description}
                  </p>
                </div>

                {/* Trading Chart Image */}
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src={strategy.image}
                    alt={`${strategy.title} trading chart`}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiversificationStrategy;