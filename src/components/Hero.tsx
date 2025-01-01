import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-navy overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-navy opacity-70 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://cdn.jsdelivr.net/gh/fortraders/web-files/world-cup-hero.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20 z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-128px)]">
          <div className="text-white space-y-6 animate-fade-in order-1 md:order-1 text-center md:text-left">
            <h1 className="text-4xl font-medium md:text-7xl md:font-bold leading-tight font-display tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-light-gray text-xl font-sans">
              {t('hero.subtitle')}
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="group bg-bright-blue hover:bg-bright-blue/90 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 animate-scale-in font-sans">
                <span>{t('hero.cta')}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
          
          <div className="animate-fade-in order-2 md:order-2 flex justify-center md:justify-start">
            <img
              src="https://cdn.prod.website-files.com/652e60598eb08a4c5d64a319/66760053164e271e7d0f935b_iweo.avif"
              alt="Trading Platform Interface"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;