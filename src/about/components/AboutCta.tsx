import { Calendar, Heart, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutCta() {
  return (
<section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="hero-banner px-8 py-12">
            <svg className="geo-overlay opacity-10">
              <defs>
                <pattern id="about-cta" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-cta)"/>
            </svg>
            <div className="absolute -top-12 -right-12 size-56 rounded-full bg-white/10 blur-3xl pointer-events-none"/>
            <div className="relative z-10 text-center">
              <div className="badge badge-ok about-cta-badge">
                <Shield className="size-3"/> Bersama Memakmurkan Masjid
              </div>
              <h2 className="text-3xl font-black text-white mt-4 mb-3">
                Jadilah Bagian dari Keluarga Besar<br/>Masjid Al-Ikhlas
              </h2>
              <p className="text-emerald-100 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                Bergabunglah bersama kami dalam membangun masjid yang makmur, transparan, dan bermanfaat bagi seluruh umat.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/donation" className="btn-primary">
                  <Heart className="size-4"/> Donasi Sekarang
                </Link>
                <Link to="/jadwal-shalat" className="about-hero-outline-btn">
                  <Calendar className="size-4"/> Jadwal Sholat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}