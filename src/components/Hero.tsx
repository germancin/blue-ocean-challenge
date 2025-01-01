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
        <div className="grid md:grid-cols-2 gap-6 items-center min-h-[calc(100vh-128px)]">
          <div className="text-white space-y-6 animate-fade-in order-1 md:order-1 text-center md:text-left">
            <h1 className="text-4xl font-medium md:text-7xl md:font-bold leading-tight font-display tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-light-gray text-xl font-sans">
              {t('hero.subtitle')}
            </p>
            <div className="flex justify-center md:justify-start">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="group bg-bright-blue hover:bg-bright-blue/90 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 animate-scale-in font-sans">
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      Unlock Your Trading Potential Today! 🚀
                    </DialogTitle>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="mt-4">
                    <SubscriptionForm onSuccess={() => setIsDialogOpen(false)} />
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Join our trusted community of traders. Your data is secure and we'll only send you tournament updates and essential news. ✨
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
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