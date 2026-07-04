import { Heart, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslate } from "@/i18n/hooks/useTranslate"

export default function AboutHero() {
  const { t } = useTranslate()

  return (
    <section className="hero-banner py-20 md:py-28">
      <svg className="geo-overlay opacity-10">
        <defs>
          <pattern
            id="about-geo"
            x="0"
            y="0"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M36 0 L72 36 L36 72 L0 36 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#about-geo)" />
      </svg>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <div className="about-hero-badge">{t('about.badge')}</div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          {t('about.mosqueName')}
          <br />
          <span className="text-emerald-300">
            {t('about.tagline')}
          </span>
        </h1>

        <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {t('about.description')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/donasi" className="btn-primary">
            <Heart className="size-4" />
            {t('about.donateNow')}
          </Link>

          <a
            href="#lokasi"
            className="about-hero-outline-btn"
          >
            <MapPin className="size-4" />
            {t('about.viewLocation')}
          </a>
        </div>
      </div>
    </section>
  )
}