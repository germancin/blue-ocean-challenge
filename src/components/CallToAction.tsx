import React from 'react';
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <div id="calltoaction" className="relative bg-navy py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 brightness-[0.2]"
        style={{
          backgroundImage: 'url("/lovable-uploads/490f6ed8-97cc-4c95-962d-26d5cac2fda8.png")',
        }}
      />
      <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          <h2 className="relative text-4xl md:text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
            {t('calltoaction.title')}
          </h2>
        </div>
        <p className="text-white/80 text-lg md:text-xl mt-4">
          {t('calltoaction.subtitle')}
        </p>
        <p className="text-bright-blue text-2xl font-semibold mt-4">
          {t('calltoaction.participate')} <br />
          {t('calltoaction.winners')}
        </p>
        <button className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:scale-105 transition-transform">
          {t('calltoaction.button')}
        </button>
        <p className="text-white text-lg mt-4">
          {t('calltoaction.success')}
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
