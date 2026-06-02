import { SectionHeader } from '../components/SectionHeader'
import { PENGURUS } from '../data/masjidData'

export default function AboutPengurus() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Kepengurusan"
            title="Takmir Masjid Al-Ikhlas"
            sub="Tim pengurus yang berdedikasi dalam melayani dan mengelola masjid."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PENGURUS.map(p => (
              <div key={p.nama} className="about-pengurus-card">
                <div className={`avatar about-pengurus-avatar ${p.bg}`}>{p.inisial}</div>
                <h3 className="text-base font-black text-gray-900 mt-3 mb-0.5">{p.nama}</h3>
                <span className="pill mb-2">{p.jabatan}</span>
                <p className="text-xs text-gray-500 leading-relaxed text-center">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}