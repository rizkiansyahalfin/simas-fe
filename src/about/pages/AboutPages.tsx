import AboutHero from '../components/AboutHero'
import AboutStats from '../components/AboutStats'
import AboutVision from '../components/AboutVision'
import AboutProgram from '../components/AboutProgram'
import AboutFacilities from '../components/AboutFacilities'
import AboutCta from '../components/AboutCta'
import AboutTimeline from '../components/AboutTimeline'
import AboutLokasi from '../components/AboutLokasi'
import AboutProfil from '../components/AboutProfil'
import AboutPengurus from '../components/AboutPengurus'



/* ─── Sub-components ─── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="about-section-label">
      <span className="about-section-dot" />
      {children}
    </div>
  )
}



/* ─── Page ─── */
export default function AboutPage() {
  return (
    <div className="w-full">

      {/* ══ 1. HERO ══ */}
      <AboutHero />

      {/* ══ 2. STATS ══ */}
        <AboutStats />

      {/* ══ 3. PROFIL + GAMBAR ══ */}
        <AboutProfil />

      {/* ══ 4. SEJARAH TIMELINE ══ */}
        <AboutTimeline />

      {/* ══ 5. VISI MISI ══ */}
        <AboutVision />
      

      {/* ══ 6. FASILITAS ══ */}
        <AboutFacilities />
      
      {/* ══ 7. PROGRAM ══ */}
      <AboutProgram />

      {/* ══ 8. PENGURUS ══ */}
        <AboutPengurus />

      {/* ══ 9. PETA LOKASI ══ */}
        <AboutLokasi />
      

      {/* ══ 10. CTA ══ */}
        <AboutCta />
      

    </div>
  )
}