import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json'
import translationKO from './locales/ko/translation.json'
import translationCH from './locales/ch/translation.json'


const resources = {
    en: {
        translation: translationEN,
    },
    ko: {
        translation: translationKO,
    },
    ch: {
        translation: translationCH,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;