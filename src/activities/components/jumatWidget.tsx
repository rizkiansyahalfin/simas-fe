import { Mic, Users, Volume2, BookOpen, CalendarDays, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ─── Types ─── */
export interface JadwalJumatData {
  tanggal: string
  khatib: string
  imam: string
  muadzin: string
  tema: string
}

/* ─── Dummy data — nanti ganti dengan API call ─── */
const JUMAT_PEKAN_INI: JadwalJumatData = {
  tanggal: "Jum'at, 9 Mei 2026",
  khatib:  'Prof. Dr. KH. Nasaruddin Umar',
  imam:    'Ust. Muzammil Hasballah',
  muadzin: 'Ahmad Fauzi',
  tema:    'Menjaga Ukhuwah di Tengah Perbedaan',
}

const ROLES = [
  { key: 'khatib'  as const, label: 'Khatib',  Icon: Mic      },
  { key: 'imam'    as const, label: 'Imam',     Icon: Users    },
  { key: 'muadzin' as const, label: 'Muadzin',  Icon: Volume2  },
]

/* ─── Props ─── */
interface Props {
  /** compact = versi kecil untuk sidebar/homepage section */
  compact?: boolean
}

export default function JumatWidget({ compact = false }: Props) {
  const j = JUMAT_PEKAN_INI

  if (compact) {
    /* ── Versi compact (untuk homepage) ── */
    return (
      <div className="jumat-widget-compact">
        {/* Header strip */}
        <div className="jumat-widget-header">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-white" />
            <span className="text-sm font-bold text-white">Shalat Jum'at Pekan Ini</span>
          </div>
          <Link to="/jadwal-shalat" className="jumat-widget-link">
            Selengkapnya <ArrowRight className="size-3" />
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{j.tanggal}</p>

          {ROLES.map(({ key, label, Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="jumat-role-icon">
                <Icon className="size-3.5 text-simas-primary-dark" />
              </div>
              <div>
                <p className="jumat-role-label">{label}</p>
                <p className={`jumat-role-name text-sm ${!j[key] ? 'jumat-role-empty' : ''}`}>
                  {j[key] || '—'}
                </p>
              </div>
            </div>
          ))}

          {j.tema && (
            <div className="jumat-tema-box mt-2">
              <p className="jumat-role-label mb-0.5">Tema Khutbah</p>
              <p className="text-sm text-gray-700 italic">"{j.tema}"</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── Versi full (untuk halaman jadwal shalat) ── */
  return (
    <div className="jumat-widget-full">
      {/* Geo pattern */}
      <svg className="geo-overlay opacity-10">
        <defs>
          <pattern id="jw-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jw-geo)"/>
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 p-6">
        {/* Left */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="size-4 text-emerald-300" />
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Shalat Jum'at Pekan Ini
            </p>
          </div>
          <p className="text-lg font-black text-white mb-4">{j.tanggal}</p>

          <div className="space-y-3">
            {ROLES.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="jumat-widget-icon">
                  <Icon className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-emerald-300 uppercase tracking-wider font-bold">{label}</p>
                  <p className="text-sm font-semibold text-white">{j[key] || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Tema */}
        <div className="md:w-72 flex flex-col justify-center">
          <div className="jumat-widget-tema">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-4 text-simas-accent" />
              <p className="text-xs font-bold text-simas-accent uppercase tracking-wider">Tema Khutbah</p>
            </div>
            <p className="text-base font-bold text-gray-800 italic leading-snug">
              "{j.tema}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}