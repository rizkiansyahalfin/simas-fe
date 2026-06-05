import { ChevronRight, Clock, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'

export default function AboutLokasi() {
  return (
<section id="lokasi" className="py-20 bg-simas-bg-public dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Lokasi"
            title="Temukan Kami"
            sub="Masjid Al-Ikhlas berlokasi strategis dan mudah dijangkau dari berbagai penjuru kota."
          />

          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">

            {/* Info lokasi */}
            <div className="lg:w-72 shrink-0 space-y-4">
              <div className="card-sm p-5">
                <h3 className="text-sm font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin className="size-4 text-simas-primary"/> Alamat Lengkap
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  Jl. Kebayoran Lama No. 12, RT 005/RW 003,<br/>
                  Kelurahan Kebayoran Lama Selatan,<br/>
                  Kecamatan Kebayoran Lama,<br/>
                  Jakarta Selatan, DKI Jakarta 12240
                </p>
              </div>
              <div className="card-sm p-5 space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="size-4 text-simas-primary"/> Jadwal Sholat
                </h3>
                {[
                  { name: 'Subuh',   time: '04:42' },
                  { name: 'Dzuhur',  time: '12:01' },
                  { name: 'Ashar',   time: '15:22' },
                  { name: 'Maghrib', time: '17:58' },
                  { name: 'Isya',    time: '19:09' },
                ].map(s => (
                  <div key={s.name} className="about-sholat-row">
                    <span className="text-sm text-gray-600 dark:text-slate-300">{s.name}</span>
                    <span className="text-sm font-black text-simas-primary-dark dark:text-emerald-400">{s.time}</span>
                  </div>
                ))}
                <Link to="/jadwal-shalat" className="btn-outline-sm w-full justify-center mt-2">
                  Jadwal Lengkap
                </Link>
              </div>
              <div className="card-sm p-5 space-y-2">
                <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Phone className="size-4 text-simas-primary"/> Kontak
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">+62 21-7234-5678</p>
                <p className="text-sm text-gray-600 dark:text-slate-300">info@masjid-alikhlas.or.id</p>
              </div>
            </div>

            {/* Embed Google Maps */}
            <div className="flex-1 about-map-wrap">
              <iframe
                title="Lokasi Masjid Al-Ikhlas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.7978!3d-6.2515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDUuNCJTIDEwNsKwNDcnNTIuMSJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                className="about-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="about-map-footer">
                <MapPin className="size-4 text-simas-primary shrink-0"/>
                <span className="text-sm text-gray-600 dark:text-slate-300">Jl. Kebayoran Lama No. 12, Jakarta Selatan</span>
                <a
                  href="https://maps.google.com/?q=Masjid+Al-Ikhlas+Jakarta+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm font-semibold text-simas-primary hover:underline whitespace-nowrap flex items-center gap-1"
                >
                  Buka Maps <ChevronRight className="size-3"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}