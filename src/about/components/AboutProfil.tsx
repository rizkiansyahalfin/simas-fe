import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SectionLabel } from '../pages/AboutPages'
import { useTranslate } from '@/i18n/hooks/useTranslate'

export default function AboutProfil() {
  const { t } = useTranslate()
    return (
<section className="py-20 bg-simas-bg-public dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* Gambar */}
            <div className="w-full lg:w-5/12 relative">
              <div className="about-img-frame"/>
              <div className="about-img-card">
                <img
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop"
                  alt="Masjid Al-Ikhlas"
                  className="about-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                <div className="about-img-caption">
                  <span className="text-3xl mb-2">🕌</span>
                  <p className="text-white font-bold text-sm">Masjid Al-Ikhlas</p>
                  <p className="text-emerald-200 text-xs">Jakarta Selatan, DKI Jakarta</p>
                </div>
              </div>
            </div>

            {/* Teks */}
            <div className="w-full lg:w-7/12 space-y-6">
              <SectionLabel>{t('about.profileLabel')}</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {t('about.profileTitle')}<br/>
                <span className="text-simas-primary">{t('about.profileTitleHighlight')}</span>
              </h2>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {t('about.profileDesc1')}
              </p>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {t('about.profileDesc2')}
              </p>

              {/* Info kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { Icon: MapPin, text: t('about.contactAddress') },
                  { Icon: Phone, text: t('about.contactPhone') },
                  { Icon: Mail, text: t('about.contactEmail') },
                  { Icon: Clock, text: t('about.contactTime') },
                ].map(({ Icon, text }) => (
                  <div key={text} className="about-contact-item">
                    <div className="about-contact-icon"><Icon className="size-4"/></div>
                    <span className="text-sm text-gray-700 dark:text-slate-200">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}