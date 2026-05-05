import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section id="beranda" className="relative bg-simas-primary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Selamat Datang di Masjid Kami
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pusat kegiatan ibadah, pendidikan, dan sosial masyarakat. Mari bersama memakmurkan masjid untuk kemaslahatan umat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-simas-primary hover:bg-gray-100 font-semibold h-12 px-8 rounded-full" size="lg">
              Jadwal Sholat
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-emerald-700 font-semibold h-12 px-8 rounded-full" size="lg">
              Salurkan Donasi <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. PROFIL MASJID SECTION */}
      <section id="profil" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Bagian Gambar dengan Ukuran Konsisten */}
            <div className="w-full lg:w-1/2">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop" 
                  alt="Profil Masjid" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply"
                />
                <div className="text-center relative z-10">
                  <span className="text-6xl">🕌</span>
                  <p className="text-gray-700 mt-4 font-bold text-lg">Foto Utama Masjid</p>
                </div>
              </div>
            </div>
            
            {/* Bagian Teks */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-block bg-emerald-100 text-simas-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Pusat Peradaban & Inspirasi Umat
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Masjid ini didirikan dengan semangat gotong royong untuk menjadi rumah ibadah yang nyaman serta pusat pengembangan karakter masyarakat. Kami berkomitmen menyajikan program-program yang bermanfaat bagi seluruh kalangan.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-simas-primary">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Kapasitas</h4>
                    <p className="text-gray-500">Menampung 1000+ Jamaah</p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-simas-primary">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Kajian Rutin</h4>
                    <p className="text-gray-500">Setiap Ba'da Maghrib & Subuh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI MISI SECTION */}
      <section id="visi-misi" className="py-20 md:py-28 bg-slate-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Visi & Misi</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Arah dan tujuan utama kami dalam berkhidmat melayani umat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-simas-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                "Menjadi masjid teladan yang makmur, mandiri, dan menjadi pusat peradaban umat yang membawa rahmat bagi alam semesta."
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-simas-primary rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-simas-primary font-bold text-xl mt-0.5">•</span>
                  Menyelenggarakan ibadah fardhu dan sunnah dengan nyaman dan khusyuk.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-simas-primary font-bold text-xl mt-0.5">•</span>
                  Menyelenggarakan pendidikan agama Islam secara terpadu.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-simas-primary font-bold text-xl mt-0.5">•</span>
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