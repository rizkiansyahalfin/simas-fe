import { SectionHeader } from "../components/SectionHeader"
import { SEJARAH_TIMELINE } from "../data/masjidData"

export default function AboutTimeline() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          label="Perjalanan Kami"
          title="Sejarah Masjid Al-Ikhlas"
          sub="Hampir lima dekade melayani umat dengan penuh dedikasi dan keikhlasan."
        />

        <div className="about-timeline">
          {SEJARAH_TIMELINE.map((item, i) => (
            <div
              key={item.tahun}
              className={`about-timeline-item ${
                i % 2 === 0
                  ? "about-timeline-left"
                  : "about-timeline-right"
              }`}
            >
              <div className="about-timeline-dot">
                <span className="about-timeline-year">
                  {item.tahun}
                </span>
              </div>

              <div className="about-timeline-card">
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                  {item.judul}
                </h3>

                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}