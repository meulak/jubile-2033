import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr/translation.json';
import enTranslation from './locales/en/translation.json';
import itTranslation from './locales/it/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'it'],
    resources: {
      fr: { translation: frTranslation },
      en: { translation: enTranslation },
      it: { translation: itTranslation }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nLanguage',
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
