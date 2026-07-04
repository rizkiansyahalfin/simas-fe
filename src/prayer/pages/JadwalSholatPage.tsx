import { useState, useEffect } from 'react'
import { MapPin, Clock, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import JumatWidget from '@/activities/components/jumatWidget'
import Seo from '@/lib/Seo'
import { useTranslate } from '@/i18n/hooks/useTranslate'

/* ─── Static prayer times (dummy — nanti dari API) ─── */
const PRAYER_TIMES_DATA = [
  { key: 'subuh',   time: '04:42' },
  { key: 'dzuhur',  time: '12:01' },
  { key: 'ashar',   time: '15:22' },
  { key: 'maghrib', time: '17:58' },
  { key: 'isya',    time: '19:09' },
] as const

const HISAB_METHODS = [
  { name: 'Kemenag RI (SIHAT)', descKey: 'Metode resmi Kementerian Agama Indonesia' },
  { name: 'MUI',                descKey: 'Majelis Ulama Indonesia' },
  { name: 'ISNA',               descKey: 'Islamic Society of North America' },
]

function buildMonthlySchedule(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date  = new Date(year, month, i + 1)
    const day   = date.getDay()
    const delta = Math.floor(i / 10)
    return {
      date,
      day,
      tanggal: i + 1,
      subuh:   `04:${42 + delta < 60 ? String(42 + delta).padStart(2, '0') : '01'}`,
      dzuhur:  '12:01',
      ashar:   `15:${22 - delta >= 0 ? String(22 - delta).padStart(2, '0') : '22'}`,
      maghrib: `17:${58 + delta < 60 ? String(58 + delta).padStart(2, '0') : '59'}`,
      isya:    `19:${9  + delta < 60 ? String(9  + delta).padStart(2, '0') : '10'}`,
      isJumat: day === 5,
    }
  })
}

function getNextPrayerKey(now: Date): typeof PRAYER_TIMES_DATA[number]['key'] {
  const cur = now.getHours() * 60 + now.getMinutes()
  for (const p of PRAYER_TIMES_DATA) {
    const [h, m] = p.time.split(':').map(Number)
    if (h * 60 + m > cur) return p.key
  }
  return PRAYER_TIMES_DATA[0].key
}

/* ─── Page ─── */
export default function JadwalSholatPage() {
  const { t } = useTranslate()

  const [now,       setNow]       = useState(new Date())
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // t('prayer.months') returns string[] from JSON
  const MONTHS: string[]   = t('prayer.months')   as unknown as string[]
  const DAYS_SHORT: string[] = t('prayer.daysShort') as unknown as string[]

  const nextKey  = getNextPrayerKey(now)
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
    d.getDate()     === today.getDate()     &&
    d.getMonth()    === today.getMonth()    &&
    d.getFullYear() === today.getFullYear()

  // Next prayer translated name + time
  const nextPrayerEntry = PRAYER_TIMES_DATA.find(p => p.key === nextKey)!
  const nextPrayerName  = t(`prayer.prayerNames.${nextKey}`) as string

  return (
    <>
      <Seo
        title={t('prayer.scheduleTitle') as string}
        description={t('prayer.scheduleDescription') as string}
        image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80"
      />

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
                <MapPin className="size-4 text-emerald-300"/>
                <h2 className="text-lg font-bold text-white">
                  {t('prayer.location')}
                </h2>
              </div>
              <p className="text-sm text-emerald-100">
                {now.toLocaleDateString(
                  /* locale berdasarkan bahasa aktif */
                  t('common.language') === 'Bahasa' ? 'id-ID' : 'en-US',
                  { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </p>
              <p className="text-xs text-emerald-200">15 Dzulqa'dah 1447 H</p>

              {/* Next prayer */}
              <div className="mt-4 inline-flex items-center gap-3 bg-white/15 backdrop-blur px-4 py-2.5 rounded-xl">
                <Clock className="size-4 text-white shrink-0"/>
                <div>
                  <p className="text-xs text-emerald-200">{t('prayer.nextPrayer')}</p>
                  <p className="text-sm font-bold text-white">
                    {nextPrayerName} — {nextPrayerEntry.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-emerald-300 uppercase tracking-wider font-bold">
                {t('prayer.calculationMethod')}
              </p>
              <p className="text-sm font-semibold text-white">
                {t('prayer.kemenagMethod')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Jadwal 5 waktu hari ini ── */}
        <div>
          <h3 className="text-base font-black text-gray-900 mb-3">
            {t('prayer.todaySchedule')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PRAYER_TIMES_DATA.map(p => {
              const isNext = p.key === nextKey
              const label  = t(`prayer.prayerNames.${p.key}`) as string
              return (
                <div key={p.key} className={isNext ? 'sholat-card-active' : 'sholat-card'}>
                  {isNext && (
                    <span className="sholat-next-badge">{t('prayer.nextLabel')}</span>
                  )}
                  <p className={isNext ? 'sholat-card-name text-emerald-100' : 'sholat-card-name'}>
                    {label}
                  </p>
                  <p className={isNext ? 'sholat-card-time text-white' : 'sholat-card-time'}>
                    {p.time}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Jadwal Jum'at widget ── */}
        <JumatWidget/>

        {/* ── Tabel jadwal bulanan ── */}
        <div>
          {/* Toolbar bulan */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-black text-gray-900">
              {t('prayer.monthlySchedule')} — {MONTHS[viewMonth]} {viewYear}
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                title={t('prayer.previousMonth') as string}
                onClick={prevMonth}
                className="page-btn"
              >
                <ChevronLeft className="size-4"/>
              </button>
              <button
                title={t('prayer.nextMonth') as string}
                onClick={nextMonth}
                className="page-btn"
              >
                <ChevronRight className="size-4"/>
              </button>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="sholat-table">
                <thead>
                  <tr className="sholat-thead-row">
                    {/* Kolom tanggal */}
                    <th className="sholat-th sholat-th-date">
                      {t('prayer.dateLabel')}
                    </th>
                    {/* Kolom nama sholat — dari JSON */}
                    {(['subuh','dzuhur','ashar','maghrib','isya'] as const).map(key => (
                      <th key={key} className="sholat-th">
                        {t(`prayer.prayerNames.${key}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map(row => {
                    const tod = isToday(row.date)
                    const dayLabel = DAYS_SHORT[row.day] ?? ''
                    return (
                      <tr
                        key={row.tanggal}
                        className={[
                          'sholat-tr',
                          tod              ? 'sholat-tr-today' : '',
                          row.isJumat && !tod ? 'sholat-tr-jumat' : '',
                        ].join(' ')}
                      >
                        <td className="sholat-td sholat-td-date">
                          <span className={tod ? 'sholat-date-today' : 'sholat-date'}>
                            {row.tanggal}
                          </span>
                          <span className="sholat-day-label">
                            {dayLabel}
                            {row.isJumat && (
                              <span className="sholat-jumat-tag">Jum'at</span>
                            )}
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
            <Info className="size-4 text-amber-600"/>
          </div>
          <div>
            <p className="text-xs font-bold text-simas-accent uppercase tracking-wider mb-2">
              Keterangan Metode Hisab
            </p>
            <div className="space-y-1.5">
              {HISAB_METHODS.map(m => (
                <div key={m.name} className="flex items-baseline gap-2">
                  <span className="size-1.5 rounded-full bg-amber-500 shrink-0 mt-1"/>
                  <p className="text-xs text-amber-800">
                    <strong>{m.name}</strong> — {m.descKey}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-700 mt-2">
              Jadwal yang ditampilkan menggunakan metode{' '}
              <strong>{t('prayer.kemenagMethod')}</strong> untuk wilayah{' '}
              {t('prayer.location')}.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}