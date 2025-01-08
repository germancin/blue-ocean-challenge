import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import translationEN from './en.json';
import translationES from './es.json';
import heroEN from './hero/en.json';
import heroES from './hero/es.json';
import diversificationEN from './diversification.en.json';
import diversificationES from './diversification.es.json';

// Merge all translations
const resources = {
  en: {
    translation: {
      ...translationEN,
      ...heroEN,
      ...diversificationEN
    }
  },
  es: {
    translation: {
      ...translationES,
      ...heroES,
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