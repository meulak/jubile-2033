import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'it'],
    resources: {
      fr: {
        translation: {
          welcome: "Bienvenue au Jubilé 2033"
        }
      },
      en: {
        translation: {
          welcome: "Welcome to Jubilee 2033"
        }
      },
      it: {
        translation: {
          welcome: "Benvenuti al Giubileo 2033"
        }
      }
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
