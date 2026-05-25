import { useState } from 'react'
import { Heart, TrendingUp, Users, Shield } from 'lucide-react'
import DonationForm from './DonationForm'
import DonationMethod from './DonationMethode'
import ThankYouPage, { type DonationSummary } from './ThankYouPage'

const STATS = [
  { icon: TrendingUp, label: 'Terkumpul Bulan Ini', value: 'Rp 128,8 Jt', iconWrap: 'icon-wrap-green' },
  { icon: Users,      label: 'Total Donatur',        value: '1.284',       iconWrap: 'icon-wrap-blue'  },
  { icon: Shield,     label: 'Tersalurkan',          value: 'Rp 45,2 Jt',  iconWrap: 'icon-wrap-amber' },
]

export default function DonationPage() {
  const [summary, setSummary] = useState<DonationSummary | null>(null)

  if (summary) {
    return (
      <ThankYouPage
        summary={summary}
        onDonateAgain={() => setSummary(null)}
      />
    )
  }

  return (
    <div className="space-y-8 pb-12">

      {/* ── Hero ── */}
      <div className="hero-banner px-8 py-10">
        <svg className="geo-overlay opacity-10">
          <defs>
            <pattern id="don-hero" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#don-hero)"/>
        </svg>
        <div className="absolute -top-12 -right-12 size-56 rounded-full bg-white/10 blur-3xl pointer-events-none"/>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="badge badge-ok don-hero-badge">
              <Heart className="size-3 fill-white text-white"/> Program Donasi SIMAS 2025
            </div>
            <h1 className="text-3xl font-black text-white mt-3 mb-2 leading-tight">
              Bersedekah adalah<br/>
              <span className="text-emerald-300">Investasi Terbaik</span>
            </h1>
            <p className="text-emerald-100 text-sm max-w-md leading-relaxed">
              Setiap rupiah dikelola secara transparan dan amanah untuk kemaslahatan umat dan kemakmuran masjid.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {STATS.map(({ icon: Icon, label, value, iconWrap }) => (
              <div key={label} className="don-stat-row">
                <div className={`icon-wrap ${iconWrap} don-stat-icon`}><Icon className="size-4"/></div>
                <div>
                  <p className="text-white font-black text-base leading-none">{value}</p>
                  <p className="text-emerald-200 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">
        <div className="lg:col-span-3">
          <DonationForm onSuccess={setSummary}/>
        </div>
        <div className="lg:col-span-2">
          <DonationMethod/>
        </div>
      </div>

    </div>
  )
}