import { SectionHeader } from '../components/SectionHeader'
import { useTranslate } from '@/i18n/hooks/useTranslate'

export default function AboutProgram() {
  const { t } = useTranslate()

  const tagColors: Record<string, string> = {
    Rutin: 'pill',
    Pendidikan: 'about-tag-pendidikan',
    Sosial: 'about-tag-sosial',
    Keuangan: 'about-tag-keuangan',
    Routine: 'pill',
    Education: 'about-tag-pendidikan',
    Social: 'about-tag-sosial',
    Finance: 'about-tag-keuangan',
  }

  const programs = t('about.programs', { returnObjects: true }) as Array<{icon: string, title: string, desc: string, tag: string}>
  return (
    <section className="py-20 bg-simas-bg-public dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          label={t('about.programLabel')}
          title={t('about.programTitle')}
          sub={t('about.programSub')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {programs.map(({ icon, title, desc, tag }) => (
            <div key={title} className="about-program-card">
              <span className="text-3xl mb-3 block">{icon}</span>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>
                <span className={tagColors[tag] ?? 'pill'}>{tag}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
