import { useState, useEffect } from 'react'
import { MapPin, Clock, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import JumatWidget from '@/components/kegiatan/jumatWidget'

/* ─── Static prayer times (dummy — nanti dari API) ─── */
const PRAYER_TIMES = [
  { name: 'Subuh',   time: '04:42' },
  { name: 'Dzuhur',  time: '12:01' },
  { name: 'Ashar',   time: '15:22' },
  { name: 'Maghrib', time: '17:58' },
  { name: 'Isya',    time: '19:09' },
]

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

/** Generate dummy monthly schedule — tiap hari jadwal sama ± sedikit variasi */
function buildMonthlySchedule(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1)
    const day  = date.getDay()
    // Variasi kecil biar realistis
    const delta = Math.floor(i / 10)
    return {
      date,
      day,
      tanggal: i + 1,
      subuh:   `04:${42 + delta < 60 ? String(42 + delta).padStart(2,'0') : '01'}`,
      dzuhur:  '12:01',
      ashar:   `15:${22 - delta >= 0 ? String(22 - delta).padStart(2,'0') : '22'}`,
      maghrib: `17:${58 + delta < 60 ? String(58 + delta).padStart(2,'0') : '59'}`,
      isya:    `19:${9  + delta < 60 ? String(9 + delta).padStart(2,'0')  : '10'}`,
      isJumat: day === 5,
    }
  })
}

const HISAB_METHODS = [
  { name: 'Kemenag RI (SIHAT)', desc: 'Metode resmi Kementerian Agama Indonesia' },
  { name: 'MUI',                desc: 'Majelis Ulama Indonesia' },
  { name: 'ISNA',               desc: 'Islamic Society of North America' },
]

/* ─── Next prayer helper ─── */
function getNextPrayer(now: Date) {
  const cur = now.getHours() * 60 + now.getMinutes()
  for (const p of PRAYER_TIMES) {
    const [h, m] = p.time.split(':').map(Number)
    if (h * 60 + m > cur) return p
  }
  return PRAYER_TIMES[0]
}

/* ─── Page ─── */
export default function JadwalSholatPage() {
  const [now, setNow] = useState(new Date())
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const next     = getNextPrayer(now)
  const schedule = buildMonthlySchedule(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const isToday = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  return (
    <div className="space-y-6">

      {/* ── Header banner ── */}
      <div className="hero-banner p-6">
        <svg className="geo-overlay opacity-10">
          <defs>
            <pattern id="sholat-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sholat-geo)"/>
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="size-4 text-emerald-300" />
              <h2 className="text-lg font-bold text-white">Jakarta Selatan, DKI Jakarta</h2>
            </div>
            <p className="text-sm text-emerald-100">
              {now.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
            </p>
            <p className="text-xs text-emerald-200">15 Dzulqa'dah 1447 H</p>

            {/* Next prayer */}
            <div className="mt-4 inline-flex items-center gap-3 bg-white/15 backdrop-blur px-4 py-2.5 rounded-xl">
              <Clock className="size-4 text-white shrink-0" />
              <div>
                <p className="text-xs text-emerald-200">Sholat Berikutnya</p>
                <p className="text-sm font-bold text-white">{next.name} — {next.time}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-emerald-300 uppercase tracking-wider font-bold">Metode Perhitungan</p>
            <p className="text-sm font-semibold text-white">Kemenag RI (SIHAT)</p>
          </div>
        </div>
      </div>

      {/* ── Jadwal 5 waktu hari ini ── */}
      <div>
        <h3 className="text-base font-black text-gray-900 mb-3">Jadwal Hari Ini</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {PRAYER_TIMES.map(p => {
            const isNext = p.name === next.name
            return (
              <div key={p.name} className={isNext ? 'sholat-card-active' : 'sholat-card'}>
                {isNext && <span className="sholat-next-badge">Berikutnya</span>}
                <p className={isNext ? 'sholat-card-name text-emerald-100' : 'sholat-card-name'}>{p.name}</p>
                <p className={isNext ? 'sholat-card-time text-white' : 'sholat-card-time'}>{p.time}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Jadwal Jum'at widget ── */}
      <JumatWidget />

      {/* ── Tabel jadwal bulanan ── */}
      <div>
        {/* Toolbar bulan */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-black text-gray-900">
            Jadwal Bulanan — {MONTHS[viewMonth]} {viewYear}
          </h3>
          <div className="flex items-center gap-1.5">
            <button title="Bulan Sebelumnya" onClick={prevMonth} className="page-btn"><ChevronLeft className="size-4"/></button>
            <button title="Bulan Berikutnya" onClick={nextMonth} className="page-btn"><ChevronRight className="size-4"/></button>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="sholat-table">
              <thead>
                <tr className="sholat-thead-row">
                  <th className="sholat-th sholat-th-date">Tanggal</th>
                  <th className="sholat-th">Subuh</th>
                  <th className="sholat-th">Dzuhur</th>
                  <th className="sholat-th">Ashar</th>
                  <th className="sholat-th">Maghrib</th>
                  <th className="sholat-th">Isya</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => {
                  const tod = isToday(row.date)
                  return (
                    <tr
                      key={row.tanggal}
                      className={[
                        'sholat-tr',
                        tod       ? 'sholat-tr-today'  : '',
                        row.isJumat && !tod ? 'sholat-tr-jumat' : '',
                      ].join(' ')}
                    >
                      <td className="sholat-td sholat-td-date">
                        <span className={tod ? 'sholat-date-today' : 'sholat-date'}>
                          {row.tanggal}
                        </span>
                        <span className="sholat-day-label">
                          {DAYS_ID[row.day]}
                          {row.isJumat && <span className="sholat-jumat-tag">Jum'at</span>}
                        </span>
                      </td>
                      <td className="sholat-td">{row.subuh}</td>
                      <td className="sholat-td">{row.dzuhur}</td>
                      <td className="sholat-td">{row.ashar}</td>
                      <td className="sholat-td">{row.maghrib}</td>
                      <td className="sholat-td">{row.isya}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Metode hisab ── */}
      <div className="info-box">
        <div className="info-box-icon">
          <Info className="size-4 text-amber-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-simas-accent uppercase tracking-wider mb-2">Keterangan Metode Hisab</p>
          <div className="space-y-1.5">
            {HISAB_METHODS.map(m => (
              <div key={m.name} className="flex items-baseline gap-2">
                <span className="size-1.5 rounded-full bg-amber-500 shrink-0 mt-1"/>
                <p className="text-xs text-amber-800">
                  <strong>{m.name}</strong> — {m.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-700 mt-2">
            Jadwal yang ditampilkan menggunakan metode <strong>Kemenag RI (SIHAT)</strong> untuk wilayah Jakarta Selatan.
            Jadwal dapat berbeda beberapa menit tergantung lokasi.
          </p>
        </div>
      </div>

    </div>
  )
}