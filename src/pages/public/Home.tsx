import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Target, CalendarDays, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import JumatWidget from "@/components/kegiatan/jumatWidget"

export default function Home() {
  return (
    <div className="w-full font-sans">

      {/* ── 1. HERO ── */}
      <section className="relative bg-simas-primary text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(to right,#ffffff1a 1px,transparent 1px),linear-gradient(to bottom,#ffffff1a 1px,transparent 1px)', backgroundSize: '32px 32px' }}/>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"/>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"/>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium tracking-wide">
            ✨ Selamat Datang di Portal SIMAS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            Selamat Datang di <br className="hidden md:block" /> Masjid Kami
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Pusat kegiatan ibadah, pendidikan, dan sosial masyarakat. Mari bersama memakmurkan masjid untuk kemaslahatan umat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-bold h-14 px-8 rounded-2xl shadow-xl transition-all hover:scale-105">
              <Link to="/jadwal-shalat">Jadwal Sholat</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10 font-bold h-14 px-8 rounded-2xl backdrop-blur-sm transition-all hover:scale-105">
              <Link to="/donasi">Salurkan Donasi <ArrowRight className="ml-2 size-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. JUMAT WIDGET SECTION ── */}
      <section className="py-16 bg-simas-bg-public">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Widget Jum'at — compact */}
            <div className="w-full lg:w-80 shrink-0">
              <JumatWidget compact />
            </div>

            {/* Jadwal Sholat ringkas */}
            <div className="flex-1 card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-simas-primary" />
                  <h2 className="text-base font-black text-gray-900">Jadwal Sholat Hari Ini</h2>
                </div>
                <Link to="/jadwal-shalat" className="btn-outline-sm text-xs py-1 px-3">
                  Lihat semua
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { name: 'Subuh',   time: '04:42' },
                  { name: 'Dzuhur',  time: '12:01' },
                  { name: 'Ashar',   time: '15:22' },
                  { name: 'Maghrib', time: '17:58' },
                  { name: 'Isya',    time: '19:09' },
                ].map(s => (
                  <div key={s.name} className="sholat-card-sm">
                    <p className="sholat-card-name">{s.name}</p>
                    <p className="sholat-card-time">{s.time}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"/>
                Jakarta Selatan · Metode Kemenag RI (SIHAT)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROFIL MASJID ── */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute left-0 top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60"/>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Gambar */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 md:-inset-6 bg-emerald-100/60 rounded-4xl -rotate-3 transition-transform hover:rotate-0 duration-500"/>
              <div className="relative w-full aspect-4/3 bg-gray-50 rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop"
                  alt="Profil Masjid"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg mb-4">
                    <span className="text-4xl">🕌</span>
                  </div>
                  <p className="text-white font-bold text-xl tracking-wide drop-shadow-md">Foto Utama Masjid</p>
                </div>
              </div>
            </div>

            {/* Teks */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-simas-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                <span className="size-2 rounded-full bg-simas-primary animate-pulse"/>
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Pusat Peradaban & <span className="text-simas-primary">Inspirasi Umat</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Masjid ini didirikan dengan semangat gotong royong untuk menjadi rumah ibadah yang nyaman serta pusat pengembangan karakter masyarakat.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { Icon: Users,    title: 'Kapasitas',    desc: 'Menampung 1000+ Jamaah' },
                  { Icon: BookOpen, title: 'Kajian Rutin', desc: "Setiap Ba'da Maghrib & Subuh" },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="p-3.5 bg-emerald-100/50 rounded-2xl text-simas-primary shrink-0">
                      <Icon className="size-7" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{title}</h4>
                      <p className="text-gray-500 font-medium">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VISI MISI ── */}
      <section className="py-24 md:py-32 bg-slate-50/50 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Visi & Misi</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg font-medium">
              Arah dan tujuan utama kami dalam berkhidmat melayani umat.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              {
                Icon: Target, title: 'Visi Kami',
                content: 'Menjadi masjid teladan yang makmur, mandiri, dan menjadi pusat peradaban umat yang membawa rahmat bagi alam semesta.',
                isQuote: true,
              },
              {
                Icon: BookOpen, title: 'Misi Kami',
                items: [
                  'Menyelenggarakan ibadah fardhu dan sunnah dengan nyaman dan khusyuk.',
                  'Menyelenggarakan pendidikan agama Islam secara terpadu.',
                  'Memberdayakan ekonomi umat melalui pengelolaan ZISWAF yang transparan.',
                ],
                isQuote: false,
              },
            ].map(({ Icon, title, content, items, isQuote }) => (
              <div key={title} className="group bg-white p-8 md:p-12 rounded-4xl border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="size-16 bg-emerald-100/50 text-simas-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="size-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>
                {isQuote ? (
                  <p className="text-gray-600 text-xl leading-relaxed italic">{content}</p>
                ) : (
                  <ul className="space-y-5 text-gray-600 text-lg font-medium">
                    {items!.map(item => (
                      <li key={item} className="flex items-start gap-4">
                        <div className="mt-1 size-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="size-2 rounded-full bg-simas-primary"/>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA DONASI ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="hero-banner px-8 py-12 text-center">
            <svg className="geo-overlay opacity-10">
              <defs>
                <pattern id="home-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#home-geo)"/>
            </svg>
            <div className="relative z-10">
              <Heart className="size-10 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-3">Salurkan Kebaikan Anda</h2>
              <p className="text-emerald-100 mb-6 max-w-md mx-auto">
                Setiap donasi Anda dikelola secara transparan untuk kemaslahatan umat dan kemakmuran masjid.
              </p>
              <Button asChild className="bg-white text-emerald-700 hover:bg-gray-50 font-bold h-12 px-8 rounded-2xl shadow-lg transition-all hover:scale-105">
                <Link to="/donasi">Donasi Sekarang <ArrowRight className="ml-2 size-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}