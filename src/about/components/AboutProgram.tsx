import { TAG_COLOR, PROGRAM } from '../data/masjidData'
import { SectionHeader } from '../components/SectionHeader'


export default function AboutProgram() {
  return (
<section className="py-20 bg-simas-bg-public">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Program Unggulan"
            title="Kegiatan & Layanan"
            sub="Program-program yang kami jalankan secara konsisten untuk kemaslahatan umat."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PROGRAM.map(({ icon, title, desc, tag }) => (
              <div key={title} className="about-program-card">
                <span className="text-3xl mb-3 block">{icon}</span>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">{title}</h3>
                  <span className={TAG_COLOR[tag] ?? 'pill'}>{tag}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
