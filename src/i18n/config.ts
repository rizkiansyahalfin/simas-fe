import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import id from './locales/id.json'

const resources = {
  en: { translation: en },
  id: { translation: id },
}

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'id', // Fallback ke Bahasa Indonesia jika bahasa tidak terdeteksi
    debug: false,
    interpolation: {
      escapeValue: false, // React sudah melindungi dari XSS
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
