import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={`Ubah bahasa ke ${i18n.language === 'en' ? 'Bahasa Indonesia' : 'English'}`}
    >
      {i18n.language === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
    </button>
  )
}
