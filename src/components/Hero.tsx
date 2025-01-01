import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-navy overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('/lovable-uploads/2eca4db5-1876-4e6d-986b-871fcd2f75f2.png')] bg-cover bg-center"
        style={{ opacity: 0.4 }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-128px)]">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-block">
              <h2 className="text-bright-blue font-semibold mb-2">tournaments</h2>
              <p className="text-light-gray font-semibold">forTraders</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Compete <br />
              With All Traders. <br />
              <span className="text-bright-blue">From Anywhere!</span>
            </h1>
            <p className="text-light-gray text-xl">
              Daily tournaments for trading challenges.
            </p>
            <button className="group bg-bright-blue hover:bg-bright-blue/90 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 animate-scale-in">
              <span>Join Tournament</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="hidden md:block animate-fade-in">
            <img
              src="/lovable-uploads/2eca4db5-1876-4e6d-986b-871fcd2f75f2.png"
              alt="Trading Platform Interface"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;