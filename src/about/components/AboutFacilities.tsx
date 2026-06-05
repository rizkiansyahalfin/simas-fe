import { FASILITAS } from '../data/masjidData'
import { SectionHeader } from '../components/SectionHeader'

export default function AboutFacilities() {
  return (
<section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Fasilitas"
            title="Sarana & Prasarana"
            sub="Kami terus meningkatkan fasilitas demi kenyamanan seluruh jamaah."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {FASILITAS.map(({ Icon, label, value, bg, color }) => (
              <div key={label} className="about-fasilitas-card">
                <div className={`about-fasilitas-icon ${bg} ${color}`}>
                  <Icon className="size-5"/>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}