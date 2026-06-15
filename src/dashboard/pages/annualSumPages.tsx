import { useState, useRef } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp, TrendingDown, Download, Printer,
  Calendar, ChevronDown, Check,
  Wallet, Heart, Users, CalendarDays,
  BarChart2, FileText, Star,
} from 'lucide-react'
import {
  TAHUN_LIST, ANNUAL_KPI, KEUANGAN_TAHUNAN,
  ZIS_TAHUNAN, ZIS_COLORS,
  JAMAAH_TAHUNAN, KEGIATAN_TAHUNAN, KEGIATAN_COLORS,
  DONASI_PIE, DONASI_PIE_COLORS,
  TOP_KEGIATAN, ANNUAL_HIGHLIGHT,
} from '@/dashboard/data/annualSumData'

/* ─── Formatters ─── */
const fmtJt  = (v: number) => 'Rp ' + (v / 1000000).toFixed(1) + ' Jt'

/* ─── Shared tooltip ─── */
function ChartTooltip({ active, payload, label, formatter }: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
  formatter?: (v: number) => string
}) {
  if (!active || !payload?.length) return null
  const fmt = formatter ?? String
  return (
    <div className="ar-tooltip">
      <p className="ar-tooltip-label">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="ar-tooltip-row">
          <span className="ar-tooltip-dot" ref={el => { if (el) el.style.background = p.color }}/>
          <span className="text-gray-500 dark:text-slate-400">{p.name}:</span>
          <span className="font-bold text-gray-800 dark:text-white">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="ar-tooltip">
      <p className="font-bold text-gray-800 dark:text-white text-sm">{payload[0].name}</p>
      <p className="text-gray-500 dark:text-slate-400 text-xs">{payload[0].value}%</p>
    </div>
  )
}

/* ─── KPI icon map ─── */
const KPI_ICONS = [Wallet, Heart, TrendingDown, BarChart2, Users, Heart]
const KPI_ICON_WRAP = [
  'icon-wrap-green', 'icon-wrap-amber', 'ar-icon-red',
  'icon-wrap-blue',  'icon-wrap-purple', 'ar-icon-teal',
]

/* ─── Category tag color ─── */
const KAT_TAG: Record<string, string> = {
  Ibadah: 'pill', Pendidikan: 'about-tag-pendidikan',
  Sosial: 'about-tag-sosial', Lainnya: 'um-badge-operator',
}

/* ─── Page ─── */
export default function AnnualSummaryPage() {
  const [tahun, setTahun]         = useState(TAHUN_LIST[0])
  const [showTahun, setShowTahun] = useState(false)
  const [printing, setPrinting]   = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  /* Print / PDF export */
  const handleExport = () => {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 200)
  }

  return (
    <div className="space-y-6 pb-10" ref={printRef}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Rekap Tahunan
          </h1>
          <p className="text-sm text-gray-400 dark:text-slate-400 mt-1">
            Ringkasan seluruh data operasional masjid sepanjang tahun.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Year selector */}
          <div className="relative">
            <button
              onClick={() => setShowTahun(v => !v)}
              className="ar-year-btn"
            >
              <Calendar className="size-4 text-gray-400"/>
              <span className="font-bold text-gray-700 dark:text-white">{tahun}</span>
              <ChevronDown className={`size-4 text-gray-400 transition-transform ${showTahun ? 'rotate-180' : ''}`}/>
            </button>
            {showTahun && (
              <div className="ar-year-dropdown">
                {TAHUN_LIST.map(y => (
                  <button key={y} onClick={() => { setTahun(y); setShowTahun(false) }}
                    className={`ar-year-item ${tahun === y ? 'ar-year-item-active' : ''}`}>
                    {y}
                    {tahun === y && <Check className="size-3.5 text-simas-primary"/>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export PDF */}
          <button onClick={handleExport} disabled={printing} className="btn-primary gap-2 no-print">
            {printing
              ? <Printer className="size-4 animate-pulse"/>
              : <Download className="size-4"/>
            }
            {printing ? 'Menyiapkan...' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* ── Hero banner ringkasan ── */}
      <div className="hero-banner px-7 py-8">
        <svg className="geo-overlay opacity-10">
          <defs>
            <pattern id="ar-geo" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M36 0 L72 36 L36 72 L0 36 Z" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="36" cy="36" r="10" fill="none" stroke="white" strokeWidth="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ar-geo)"/>
        </svg>
        <div className="absolute -top-12 -right-12 size-56 rounded-full bg-white/10 blur-3xl pointer-events-none"/>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="badge badge-ok ar-hero-badge mb-3">
              <Star className="size-3"/> Laporan Tahunan {tahun}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">
              Masjid Al-Ikhlas — Rekap {tahun}
            </h2>
            <p className="text-emerald-100 text-sm max-w-lg leading-relaxed">
              Alhamdulillah, tahun {tahun} penuh berkah. Surplus keuangan meningkat 28%,
              jamaah bertambah 284 orang, dan 126 kegiatan berhasil diselenggarakan.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ANNUAL_HIGHLIGHT.map(h => (
              <div key={h.label} className="ar-highlight-item">
                <span className="text-2xl">{h.icon}</span>
                <div>
                  <p className="text-xs text-emerald-300 font-semibold">{h.label}</p>
                  <p className="text-sm font-bold text-white leading-tight">{h.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI 6-grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {ANNUAL_KPI.map((k, i) => {
          const Icon = KPI_ICONS[i]
          return (
            <div key={k.label} className="stat-card flex-col items-start gap-3 dark:bg-slate-900 dark:border-slate-800">
              <div className={`icon-wrap ${KPI_ICON_WRAP[i]}`}>
                <Icon className="size-5"/>
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider truncate">{k.label}</p>
                <p className="text-lg font-black text-gray-900 dark:text-white leading-tight mt-0.5">{k.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {k.up
                    ? <TrendingUp className="size-3 text-emerald-500 shrink-0"/>
                    : <TrendingDown className="size-3 text-red-400 shrink-0"/>
                  }
                  <span className={`text-xs font-bold ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>{k.trend}</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">vs tahun lalu</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Chart row 1: Keuangan + ZIS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Area Keuangan */}
        <div className="card dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="ar-chart-header">
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Arus Keuangan Tahunan</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Pemasukan vs Pengeluaran sepanjang {tahun}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="db-legend-dot bg-simas-primary"/>
                <span className="text-xs text-gray-500">Pemasukan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="db-legend-dot bg-amber-400"/>
                <span className="text-xs text-gray-500">Pengeluaran</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={KEUANGAN_TAHUNAN} margin={{ top:4, right:4, left:0, bottom:0 }}>
              <defs>
                <linearGradient id="arGradP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="arGradK" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="bulan" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={v => (v/1000000).toFixed(0)+'Jt'} tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} width={36}/>
              <Tooltip content={<ChartTooltip formatter={fmtJt}/>}/>
              <Area type="monotone" dataKey="pemasukan"   name="Pemasukan"   stroke="#10b981" strokeWidth={2} fill="url(#arGradP)" dot={false} activeDot={{ r:4, strokeWidth:0 }}/>
              <Area type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#f59e0b" strokeWidth={2} fill="url(#arGradK)" dot={false} activeDot={{ r:4, strokeWidth:0 }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ZIS Stacked */}
        <div className="card dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="ar-chart-header">
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Penerimaan ZIS Tahunan</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Zakat, Infaq, Sedekah & Wakaf per bulan</p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-end">
              {Object.entries(ZIS_COLORS).map(([k, color]) => (
                <div key={k} className="flex items-center gap-1">
                  <span className="db-legend-dot" ref={el => { if (el) el.style.background = color }}/>
                  <span className="text-xs text-gray-500 capitalize">{k}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ZIS_TAHUNAN} margin={{ top:4, right:4, left:0, bottom:0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="bulan" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={v => (v/1000000).toFixed(0)+'Jt'} tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} width={36}/>
              <Tooltip content={<ChartTooltip formatter={fmtJt}/>}/>
              <Bar dataKey="zakat"   name="Zakat"   stackId="a" fill={ZIS_COLORS.zakat}   radius={[0,0,0,0]}/>
              <Bar dataKey="infaq"   name="Infaq"   stackId="a" fill={ZIS_COLORS.infaq}   radius={[0,0,0,0]}/>
              <Bar dataKey="sedekah" name="Sedekah" stackId="a" fill={ZIS_COLORS.sedekah} radius={[0,0,0,0]}/>
              <Bar dataKey="wakaf"   name="Wakaf"   stackId="a" fill={ZIS_COLORS.wakaf}   radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Chart row 2: Pertumbuhan Jamaah + Kegiatan ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Line Jamaah */}
        <div className="card dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="ar-chart-header">
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Pertumbuhan Jamaah</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Total jamaah & jamaah baru per bulan</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="db-legend-dot bg-simas-primary"/>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="db-legend-dot bg-sky-400"/>
                <span className="text-xs text-gray-500">Jamaah Baru</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={JAMAAH_TAHUNAN} margin={{ top:4, right:4, left:0, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="bulan" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="left"  tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} width={44}/>
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} width={30}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Line yAxisId="left"  type="monotone" dataKey="total"   name="Total Jamaah"  stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r:4, strokeWidth:0 }}/>
              <Line yAxisId="right" type="monotone" dataKey="baru"    name="Jamaah Baru"   stroke="#0ea5e9" strokeWidth={2}   dot={false} activeDot={{ r:4, strokeWidth:0 }} strokeDasharray="5 3"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Kegiatan grouped */}
        <div className="card dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="ar-chart-header">
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Kegiatan per Kategori</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Jumlah kegiatan setiap bulan sepanjang {tahun}</p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-end">
              {Object.entries(KEGIATAN_COLORS).map(([k, color]) => (
                <div key={k} className="flex items-center gap-1">
                  <span className="db-legend-dot" ref={el => { if (el) el.style.background = color }}/>
                  <span className="text-xs text-gray-500 capitalize">{k}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={KEGIATAN_TAHUNAN} margin={{ top:4, right:4, left:0, bottom:0 }} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="bulan" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} width={24}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Bar dataKey="ibadah"     name="Ibadah"     fill={KEGIATAN_COLORS.ibadah}     radius={[3,3,0,0]}/>
              <Bar dataKey="pendidikan" name="Pendidikan" fill={KEGIATAN_COLORS.pendidikan} radius={[3,3,0,0]}/>
              <Bar dataKey="sosial"     name="Sosial"     fill={KEGIATAN_COLORS.sosial}     radius={[3,3,0,0]}/>
              <Bar dataKey="lainnya"    name="Lainnya"    fill={KEGIATAN_COLORS.lainnya}    radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 3: Pie donasi + Top kegiatan ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Pie distribusi */}
        <div className="lg:col-span-2 card dark:bg-slate-900 dark:border-slate-800 p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-black text-gray-900 dark:text-white">Distribusi Donasi</h2>
            <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">Komposisi kategori sepanjang {tahun}</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={DONASI_PIE} cx="50%" cy="50%" innerRadius={48} outerRadius={76} paddingAngle={3} dataKey="value">
                  {DONASI_PIE.map((_, i) => <Cell key={i} fill={DONASI_PIE_COLORS[i]} stroke="none"/>)}
                </Pie>
                <Tooltip content={<PieTooltip/>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-1">
            {DONASI_PIE.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="db-legend-dot" ref={el => { if (el) el.style.background = DONASI_PIE_COLORS[i] }}/>
                  <span className="text-xs text-gray-600 dark:text-slate-400">{d.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 kegiatan */}
        <div className="lg:col-span-3 card dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
          <div className="ar-chart-header border-b border-gray-50 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="icon-wrap icon-wrap-amber"><CalendarDays className="size-5"/></div>
              <div>
                <h2 className="text-base font-black text-gray-900 dark:text-white">Top Kegiatan {tahun}</h2>
                <p className="text-xs text-gray-400 dark:text-slate-400">5 kegiatan dengan peserta terbanyak</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-slate-800">
            {TOP_KEGIATAN.map((k, i) => (
              <div key={k.nama} className="ar-top-row">
                <div className="ar-top-rank">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{k.nama}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={KAT_TAG[k.kategori] ?? 'pill'}>{k.kategori}</span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{k.bulan} {tahun}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-simas-primary">{k.peserta}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">peserta</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary tabel ringkas ── */}
      <div className="card dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
        <div className="ar-chart-header border-b border-gray-50 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="icon-wrap icon-wrap-green"><FileText className="size-5"/></div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">Ringkasan Bulanan {tahun}</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400">Perbandingan data tiap bulan dalam satu tabel</p>
            </div>
          </div>
          <button onClick={handleExport} className="btn-outline-sm no-print">
            <Printer className="size-3.5"/> Cetak
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="ar-table">
            <thead>
              <tr className="ar-thead-row">
                {['Bulan','Pemasukan','Pengeluaran','ZIS','Jamaah Baru','Kegiatan'].map(h => (
                  <th key={h} className="ar-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KEUANGAN_TAHUNAN.map((row, i) => {
                const jamaah  = JAMAAH_TAHUNAN[i]
                const kegiatan = KEGIATAN_TAHUNAN[i]
                const totalZIS = (ZIS_TAHUNAN[i]?.zakat ?? 0) + (ZIS_TAHUNAN[i]?.infaq ?? 0) + (ZIS_TAHUNAN[i]?.sedekah ?? 0) + (ZIS_TAHUNAN[i]?.wakaf ?? 0)
                const totalKeg = kegiatan.ibadah + kegiatan.pendidikan + kegiatan.sosial + kegiatan.lainnya
                return (
                  <tr key={row.bulan} className="ar-tr">
                    <td className="ar-td ar-td-bulan font-semibold">{row.bulan}</td>
                    <td className="ar-td text-simas-primary-dark font-bold">{fmtJt(row.pemasukan)}</td>
                    <td className="ar-td text-amber-600 font-bold">{fmtJt(row.pengeluaran)}</td>
                    <td className="ar-td text-emerald-700 font-bold">{fmtJt(totalZIS)}</td>
                    <td className="ar-td">
                      <span className="badge badge-ok">+{jamaah?.baru ?? 0}</span>
                    </td>
                    <td className="ar-td">
                      <span className="text-sm font-bold text-gray-700 dark:text-slate-300">{totalKeg}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* Footer total */}
            <tfoot>
              <tr className="ar-tfoot-row">
                <td className="ar-td ar-td-bulan font-black text-gray-900 dark:text-white">TOTAL</td>
                <td className="ar-td font-black text-simas-primary">
                  {fmtJt(KEUANGAN_TAHUNAN.reduce((s,r) => s + r.pemasukan, 0))}
                </td>
                <td className="ar-td font-black text-amber-600">
                  {fmtJt(KEUANGAN_TAHUNAN.reduce((s,r) => s + r.pengeluaran, 0))}
                </td>
                <td className="ar-td font-black text-emerald-700">
                  {fmtJt(ZIS_TAHUNAN.reduce((s,r) => s + r.zakat + r.infaq + r.sedekah + r.wakaf, 0))}
                </td>
                <td className="ar-td font-black text-gray-900 dark:text-white">
                  +{JAMAAH_TAHUNAN.reduce((s,r) => s + r.baru, 0)}
                </td>
                <td className="ar-td font-black text-gray-900 dark:text-white">
                  {KEGIATAN_TAHUNAN.reduce((s,r) => s + r.ibadah + r.pendidikan + r.sosial + r.lainnya, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  )
}