import { LineChart, Wallet, BarChart3 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DiversificationStrategy = () => {
  const isMobile = useIsMobile();

  const strategies = [
    {
      icon: <LineChart className="w-16 h-16 text-white" />,
      title: "Forex Trading",
      description: "Trade major currency pairs with advanced technical analysis and risk management strategies",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-white" />,
      title: "Stock Indices",
      description: "Access global markets through major stock indices with comprehensive market analysis",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    },
    {
      icon: <Wallet className="w-16 h-16 text-white" />,
      title: "Cryptocurrency",
      description: "Trade digital assets with cutting-edge blockchain technology and market insights",
      image: "/lovable-uploads/3989779a-ba8e-4c99-8c5c-94da1f9b246a.png"
    }
  ];

  const StrategyCard = ({ strategy, className = "" }) => (
    <div
      className={`group relative bg-navy/50 backdrop-blur-sm border border-bright-blue/20 rounded-xl overflow-hidden hover:border-bright-blue/50 transition-all duration-300 transform hover:-translate-y-2 ${className}`}
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex flex-col h-full">
        <div className="p-8 space-y-6">
          <div className="flex justify-center">
            {strategy.icon}
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-bright-blue font-display tracking-tight">
              {strategy.title}
            </h3>
            
            <p className="text-white text-lg font-sans">
              {strategy.description}
            </p>
          </div>
        </div>

        {/* Trading Chart Image */}
        <div className="mt-auto">
          <img
            src={strategy.image}
            alt={`${strategy.title} trading chart`}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-navy py-20 overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            <h2 className="relative text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
              Diversified Trading Strategies
            </h2>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-1 bg-bright-blue rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-bright-blue to-purple-500 rounded-full"></div>
            <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {isMobile ? (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {strategies.map((strategy, index) => (
                <CarouselItem key={index}>
                  <StrategyCard strategy={strategy} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 text-white" />
            <CarouselNext className="absolute right-0 text-white" />
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <StrategyCard key={index} strategy={strategy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiversificationStrategy;