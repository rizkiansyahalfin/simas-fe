import { BookOpen, ChevronRight, Target } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export default function AboutVision() {
  return (
<section className="py-20 bg-simas-bg-public">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Visi & Misi"
            title="Arah & Tujuan Kami"
            sub="Landasan yang mengarahkan setiap langkah pelayanan kami kepada umat."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Visi */}
            <div className="about-vm-card group dark:bg-slate-900 dark:border-slate-800">
              <div className="about-vm-icon about-vm-icon-green">
                <Target className="size-7"/>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Visi</h3>
              <div className="about-vm-quote">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed italic text-base">
                  "Menjadi masjid teladan yang makmur, mandiri, dan menjadi pusat peradaban umat yang membawa rahmat bagi alam semesta."
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="about-vm-card group dark:bg-slate-900 dark:border-slate-800">
              <div className="about-vm-icon about-vm-icon-amber">
                <BookOpen className="size-7"/>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Misi</h3>
              <ul className="space-y-3">
                {[
                  'Menyelenggarakan ibadah fardhu dan sunnah dengan nyaman dan khusyuk.',
                  'Menyelenggarakan pendidikan agama Islam secara terpadu untuk semua kalangan.',
                  'Memberdayakan ekonomi umat melalui pengelolaan ZISWAF yang transparan.',
                  'Membangun generasi Qurani yang berakhlak mulia dan berwawasan luas.',
                ].map(m => (
                  <li key={m} className="flex items-start gap-3">
                    <div className="about-misi-dot"><ChevronRight className="size-3 text-simas-primary dark:text-emerald-400"/></div>
                    <span className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
}