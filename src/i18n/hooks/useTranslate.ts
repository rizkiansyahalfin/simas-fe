import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

// Hook ini menyediakan translation function dengan type safety
export const useTranslate = () => {
  const { t, i18n } = useTranslation()

  const navItems = useMemo(
    () => [
      { title: t('nav.home'), path: '/' },
      { title: t('nav.donation'), path: '/donation' },
      { title: t('nav.agenda'), path: '/agenda' },
      { title: t('nav.gallery'), path: '/galeri' },
      { title: t('nav.articles'), path: '/artikel' },
      { title: t('nav.prayerSchedule'), path: '/jadwal-shalat' },
      { title: t('nav.campaigns'), path: '/campaigns' },
      { title: t('nav.about'), path: '/about' },
    ],
    [t]
  )

  return { t, i18n, navItems }
}

// Hook untuk language preference
export const useLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: 'en' | 'id') => {
    i18n.changeLanguage(lang)
  }

  const currentLanguage = i18n.language as 'en' | 'id'
  const isEnglish = currentLanguage === 'en'
  const isIndonesian = currentLanguage === 'id'

  return {
    current: currentLanguage,
    isEnglish,
    isIndonesian,
    changeLanguage,
  }
}
