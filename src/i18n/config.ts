import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enRules from './rules/en.json';
import esRules from './rules/es.json';
import en from './en.json';
import es from './es.json';
import enHero from './hero/en.json';
import esHero from './hero/es.json';

const resources = {
  en: {
    translation: en,
    rules: enRules,
    hero: enHero,
  },
  es: {
    translation: es,
    rules: esRules,
    hero: esHero,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
  });

export default i18n;