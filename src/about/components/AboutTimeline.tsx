import { SectionHeader } from "../components/SectionHeader"
import { useTranslate } from "@/i18n/hooks/useTranslate"

export default function AboutTimeline() {
  const { t } = useTranslate()
  const timelineItems = t('about.timeline', { returnObjects: true }) as Array<{year: string, title: string, desc: string}>
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          label={t('about.timelineLabel')}
          title={t('about.timelineTitle')}
          sub={t('about.timelineSub')}
        />

        <div className="about-timeline">
          {timelineItems.map((item, i) => (
            <div
              key={item.year}
              className={`about-timeline-item ${
                i % 2 === 0
                  ? "about-timeline-left"
                  : "about-timeline-right"
              }`}
            >
              <div className="about-timeline-dot">
                <span className="about-timeline-year">
                  {item.year}
                </span>
              </div>

              <div className="about-timeline-card">
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}