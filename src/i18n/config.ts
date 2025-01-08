import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import translationEN from './en.json';
import translationES from './es.json';
import diversificationEN from './diversification.en.json';
import diversificationES from './diversification.es.json';

// Merge all translations
const resources = {
  en: {
    translation: {
      ...translationEN,
      ...diversificationEN
    }
  },
  es: {
    translation: {
      ...translationES,
      ...diversificationES
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;