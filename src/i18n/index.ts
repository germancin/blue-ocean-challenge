import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import ptTranslations from './locales/pt.json';

// Function to get user's location and determine language
const getGeoLanguage = () => {
	try {
		// Get from localStorage first if exists
		const cachedLanguage = localStorage.getItem('geoLanguage');
		if (cachedLanguage) {
			return cachedLanguage;
		}

		// If no cached language, fetch it
		fetch('https://ipapi.co/json/')
			.then((response) => response.json())
			.then((data) => {
				const countryCode = data.country_code.toLowerCase();

				// Map country codes to our supported languages
				const countryToLanguage: { [key: string]: string } = {
					es: 'es', // Spain
					mx: 'es', // Mexico
					ar: 'es', // Argentina
					co: 'es', // Colombia
					ve: 'es', // Venezuela
					cl: 'es', // Chile
					pe: 'es', // Peru
					ec: 'es', // Ecuador
					uy: 'es', // Uruguay
					py: 'es', // Paraguay
					bo: 'es', // Bolivia
					us: 'en', // United States
					gb: 'en', // United Kingdom
					br: 'pt', // Brazil
					pt: 'pt', // Portugal
				};

				const detectedLanguage = countryToLanguage[countryCode] || 'en';
				localStorage.setItem('geoLanguage', detectedLanguage);
				i18n.changeLanguage(detectedLanguage);
				return detectedLanguage;
			})
			.catch((error) => {
				console.log('Error detecting location:', error);
				return 'en';
			});

		return 'en'; // Default while fetching
	} catch (error) {
		console.log('Error detecting location:', error);
		return 'en';
	}
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
	name: 'geoLocation',
	lookup: () => {
		return getGeoLanguage();
	},
	cacheUserLanguage: (lng) => {
		localStorage.setItem('i18nextLng', lng);
	},
});

i18n.use(languageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enTranslations,
			},
			es: {
				translation: esTranslations,
			},
			pt: {
				translation: ptTranslations,
			},
		},
		fallbackLng: 'en',
		detection: {
			order: ['localStorage', 'geoLocation', 'navigator', 'htmlTag'], // order
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
