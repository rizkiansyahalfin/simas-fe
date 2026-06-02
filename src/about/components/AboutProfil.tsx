import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SectionLabel } from '../pages/AboutPages'

export default function AboutProfil() {
    return (
<section className="py-20 bg-simas-bg-public">
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
              <SectionLabel>Profil Masjid</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Pusat Peradaban &<br/>
                <span className="text-simas-primary">Inspirasi Umat</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Masjid Al-Ikhlas adalah masjid jami' yang terletak di Jl. Kebayoran Lama No. 12, Jakarta Selatan. Didirikan pada tahun 1975 dengan semangat gotong royong, masjid ini telah berkembang menjadi pusat kegiatan keagamaan, pendidikan, dan sosial bagi masyarakat sekitar.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan luas bangunan 2.400 m² di atas lahan 3.000 m², masjid ini mampu menampung lebih dari 1.200 jamaah. Berbagai program unggulan telah dijalankan secara konsisten, mulai dari kajian ilmu, tahfidz Al-Quran, santunan sosial, hingga pemberdayaan ekonomi umat melalui ZISWAF.
              </p>

              {/* Info kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { Icon: MapPin,   text: 'Jl. Kebayoran Lama No. 12, Jakarta Selatan' },
                  { Icon: Phone,    text: '+62 21-7234-5678' },
                  { Icon: Mail,     text: 'info@masjid-alikhlas.or.id' },
                  { Icon: Clock,    text: 'Buka 24 jam untuk ibadah' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="about-contact-item">
                    <div className="about-contact-icon"><Icon className="size-4"/></div>
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}