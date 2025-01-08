import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubscriptionForm } from './SubscriptionForm';
import { useState } from 'react';

const Hero = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-cyber-black overflow-hidden">
      {/* Video Background with Cyber Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/90 via-cyber-black/70 to-cyber-black/90 z-10" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/817e184b-18df-4d93-a6ea-902fb47b7399.png')] bg-cover bg-center opacity-40" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
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
          <div className="text-white space-y-8 animate-fade-in order-1 md:order-1 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-block bg-neon-green/10 backdrop-blur-sm px-6 py-3 rounded-full border border-neon-green/20 animate-glow">
                <span className="text-neon-green font-semibold">🏆 {t('hero.tournament2024')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-cyber-blue via-neon-green to-cyber-blue bg-clip-text text-transparent animate-pulse">
                {t('hero.mainMessage')}
              </h1>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="group relative overflow-hidden bg-cyber-gradient text-cyber-black px-8 py-4 rounded-xl flex items-center space-x-2 transition-all duration-300 animate-scale-in font-sans shadow-lg shadow-neon-green/20 hover:shadow-neon-green/40">
                    <span className="relative z-10 font-semibold">{t('hero.cta')}</span>
                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green via-cyber-blue to-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-dark-cyber/95 backdrop-blur-lg p-8 rounded-xl border border-neon-green/20">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center text-neon-green mb-2">
                      {t('hero.dialog.title')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <SubscriptionForm onSuccess={() => setIsDialogOpen(false)} />
                    <p className="text-center text-sm text-neon-green/70 mt-4">
                      {t('hero.dialog.description')}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="animate-fade-in order-2 md:order-2 flex justify-center md:justify-start relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-cyber-blue/20 rounded-lg filter blur-3xl" />
            <img
              src="https://cdn.prod.website-files.com/652e60598eb08a4c5d64a319/66760053164e271e7d0f935b_iweo.avif"
              alt="Trading Platform Interface"
              className="relative rounded-lg shadow-2xl w-full transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;