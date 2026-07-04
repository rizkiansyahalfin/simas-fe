import { Users, BookOpen, Wifi, Car, Droplets, Award } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { useTranslate } from '@/i18n/hooks/useTranslate'

export default function AboutFacilities() {
  const { t } = useTranslate()

  const iconMap = [Users, BookOpen, Wifi, Car, Droplets, Award]
  const facilities = t('about.facilities', { returnObjects: true }) as Array<{label: string, value: string}>
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          label={t('about.facilitiesLabel')}
          title={t('about.facilitiesTitle')}
          sub={t('about.facilitiesSub')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {facilities.map(({ label, value }, idx) => {
            const Icon = iconMap[idx] || Users
            const colors = [
              { bg: 'bg-emerald-50', color: 'text-simas-primary-dark' },
              { bg: 'bg-sky-50', color: 'text-sky-700' },
              { bg: 'bg-violet-50', color: 'text-violet-700' },
              { bg: 'bg-amber-50', color: 'text-amber-700' },
              { bg: 'bg-blue-50', color: 'text-blue-700' },
              { bg: 'bg-pink-50', color: 'text-pink-700' },
            ]
            const { bg, color } = colors[idx] || colors[0]
            return (
              <div key={label} className="about-fasilitas-card">
                <div className={`about-fasilitas-icon ${bg} ${color}`}>
                  <Icon className="size-5"/>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}