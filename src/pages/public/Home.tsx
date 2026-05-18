import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full font-sans">
      {/* 1. HERO SECTION */}
      <section id="beranda" className="relative bg-simas-primary text-white py-24 md:py-36 overflow-hidden">
        {/* Dekorasi Background: Pola Grid dan Efek Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[32px_32px] opacity-30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-120 h-120 bg-emerald-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium tracking-wide">
            ✨ Selamat Datang di Portal SIMAS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            Selamat Datang di <br className="hidden md:block" /> Masjid Kami
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Pusat kegiatan ibadah, pendidikan, dan sosial masyarakat. Mari bersama memakmurkan masjid untuk kemaslahatan umat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button className="bg-white text-emerald-700 hover:bg-gray-50 font-bold h-14 px-8 rounded-2xl shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105 hover:shadow-emerald-900/20" size="lg">
              Jadwal Sholat
            </Button>
            <Button variant="outline" className="text-white border-white/40 hover:bg-white/10 font-bold h-14 px-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105" size="lg">
              Salurkan Donasi <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. PROFIL MASJID SECTION */}
      <section id="profil" className="py-24 md:py-32 bg-white relative">
        {/* Ornamen latar belakang samar */}
        <div className="absolute left-0 top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Bagian Gambar dengan Efek Bingkai Tumpuk */}
            <div className="w-full lg:w-1/2 relative">
              {/* Bingkai dekoratif di belakang */}
              <div className="absolute -inset-4 md:-inset-6 bg-emerald-100/60 rounded-4xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
              
              <div className="relative w-full aspect-4/3 bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop" 
                  alt="Profil Masjid" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                <div className="text-center relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center border border-white/30 shadow-lg mb-4">
                    <span className="text-4xl drop-shadow-md">🕌</span>
                  </div>
                  <p className="text-white font-bold text-xl tracking-wide drop-shadow-md">Foto Utama Masjid</p>
                </div>
              </div>
            </div>
            
            {/* Bagian Teks */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-simas-primary px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-simas-primary animate-pulse"></span>
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Pusat Peradaban & <span className="text-simas-primary">Inspirasi Umat</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                Masjid ini didirikan dengan semangat gotong royong untuk menjadi rumah ibadah yang nyaman serta pusat pengembangan karakter masyarakat. Kami berkomitmen menyajikan program-program yang bermanfaat bagi seluruh kalangan.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {/* Info Card 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="p-3.5 bg-emerald-100/50 rounded-2xl text-simas-primary shrink-0">
                    <Users className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Kapasitas</h4>
                    <p className="text-gray-500 font-medium">Menampung 1000+ Jamaah</p>
                  </div>
                </div>
                {/* Info Card 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="p-3.5 bg-emerald-100/50 rounded-2xl text-simas-primary shrink-0">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Kajian Rutin</h4>
                    <p className="text-gray-500 font-medium">Setiap Ba'da Maghrib & Subuh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI MISI SECTION */}
      <section id="visi-misi" className="py-24 md:py-32 bg-slate-50/50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Visi & Misi</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Arah dan tujuan utama kami dalam berkhidmat melayani umat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Card Visi */}
            <div className="group bg-white p-8 md:p-12 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-emerald-200 hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 text-simas-primary rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Visi Kami</h3>
              <p className="text-gray-600 text-xl leading-relaxed italic relative z-10">
                <span className="text-emerald-200 text-5xl absolute -top-4 -left-4 -z-10">"</span>
                Menjadi masjid teladan yang makmur, mandiri, dan menjadi pusat peradaban umat yang membawa rahmat bagi alam semesta.
              </p>
            </div>

            {/* Card Misi */}
            <div className="group bg-white p-8 md:p-12 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-emerald-200 hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 text-simas-primary rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Misi Kami</h3>
              <ul className="space-y-5 text-gray-600 text-lg font-medium">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-simas-primary"></span>
                  </div>
                  Menyelenggarakan ibadah fardhu dan sunnah dengan nyaman dan khusyuk.
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-simas-primary"></span>
                  </div>
                  Menyelenggarakan pendidikan agama Islam secara terpadu.
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-simas-primary"></span>
                  </div>
                  Memberdayakan ekonomi umat melalui pengelolaan ZISWAF yang transparan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}