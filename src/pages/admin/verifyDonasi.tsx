import { useState } from 'react'
import {
  Search, Download, MoreVertical, X, ExternalLink,
  Phone, Calendar, Tag, CheckCircle2, XCircle, Clock,
  ChevronLeft, ChevronRight, Eye, TrendingUp,
  Wallet, Users, AlertCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button'

/* ─── Types & Data ───────────────────────────────────── */
type Status = 'menunggu' | 'terverifikasi' | 'ditolak'

interface Donasi {
  id: string; nama: string; inisial: string; avatarBg: string
  nominal: number; kategori: string; tanggal: string; waktu: string
  wa: string; catatan: string; status: Status; metode: string
}

const DATA: Donasi[] = [
  { id:'D001', nama:'H. Sulaiman Basir',  inisial:'SB', avatarBg:'bg-simas-primary-dark', nominal:500000,  kategori:'Infaq Masjid',  tanggal:'12 Okt 2024', waktu:'14:30 WIB', wa:'0812-XXXX-1234', catatan:'Infaq untuk renovasi tempat wudhu.',  status:'menunggu',      metode:'Transfer BSI' },
  { id:'D002', nama:'Ibu Siti Aminah',    inisial:'SA', avatarBg:'bg-violet-600',          nominal:250000,  kategori:'Sedekah',       tanggal:'11 Okt 2024', waktu:'09:15 WIB', wa:'0813-XXXX-5678', catatan:'Semoga bermanfaat.',                 status:'terverifikasi', metode:'QRIS' },
  { id:'D003', nama:'Bpk. Ahmad Yusuf',   inisial:'AY', avatarBg:'bg-amber-500',           nominal:1000000, kategori:'Zakat Maal',    tanggal:'10 Okt 2024', waktu:'16:45 WIB', wa:'0856-XXXX-9012', catatan:'Zakat penghasilan bulan Oktober.',   status:'terverifikasi', metode:'Transfer BCA' },
  { id:'D004', nama:'Nur Hidayah',        inisial:'NH', avatarBg:'bg-sky-600',             nominal:100000,  kategori:'Operasional',   tanggal:'10 Okt 2024', waktu:'11:20 WIB', wa:'0878-XXXX-3456', catatan:'',                                   status:'ditolak',       metode:'Transfer Mandiri' },
  { id:'D005', nama:'Keluarga Prasetyo',  inisial:'KP', avatarBg:'bg-pink-600',            nominal:750000,  kategori:'Wakaf',         tanggal:'09 Okt 2024', waktu:'08:00 WIB', wa:'0815-XXXX-7890', catatan:'Wakaf Al-Quran untuk perpustakaan.', status:'menunggu',      metode:'Transfer BSI' },
  { id:'D006', nama:'Hamba Allah',        inisial:'HA', avatarBg:'bg-slate-500',           nominal:50000,   kategori:'Infaq Masjid',  tanggal:'08 Okt 2024', waktu:'20:30 WIB', wa:'-',              catatan:'',                                   status:'terverifikasi', metode:'QRIS' },
  { id:'D007', nama:'Ustadz Rizal Fauzi', inisial:'RF', avatarBg:'bg-cyan-600',            nominal:300000,  kategori:'Sedekah',       tanggal:'07 Okt 2024', waktu:'13:00 WIB', wa:'0821-XXXX-2345', catatan:'Untuk anak yatim.',                  status:'menunggu',      metode:'Transfer BCA' },
  { id:'D008', nama:'Ibu Dewi Rahayu',    inisial:'DR', avatarBg:'bg-orange-600',          nominal:200000,  kategori:'Operasional',   tanggal:'06 Okt 2024', waktu:'10:10 WIB', wa:'0819-XXXX-6789', catatan:'Untuk kebutuhan listrik masjid.',    status:'terverifikasi', metode:'QRIS' },
]

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

/* Status config — only Tailwind classes, no inline */
const S_CFG = {
  menunggu:      { badge:'badge badge-waiting',  dot:'badge-dot dot-waiting',  label:'Menunggu',      Icon: Clock },
  terverifikasi: { badge:'badge badge-ok',       dot:'badge-dot dot-ok',       label:'Terverifikasi', Icon: CheckCircle2 },
  ditolak:       { badge:'badge badge-rejected', dot:'badge-dot dot-rejected', label:'Ditolak',       Icon: XCircle },
}

const STAT_ROWS = [
  { iconCls:'icon-wrap icon-wrap-green',  Icon: Wallet,       label:'Total Terverifikasi' },
  { iconCls:'icon-wrap icon-wrap-amber',  Icon: AlertCircle,  label:'Menunggu Verifikasi' },
  { iconCls:'icon-wrap icon-wrap-blue',   Icon: TrendingUp,   label:'Telah Diverifikasi' },
  { iconCls:'icon-wrap icon-wrap-purple', Icon: Users,        label:'Total Donatur' },
]

/* ─── Verify Panel ───────────────────────────────────── */
function VerifyPanel({ d, onClose, onVerify, onReject }: {
  d: Donasi; onClose: () => void
  onVerify: (id: string) => void
  onReject: (id: string) => void
}) {
  const cfg = S_CFG[d.status]
  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="slide-panel">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">{d.id}</p>
            <h2 className="text-xl font-black text-gray-900">{d.nama}</h2>
            <p className="text-2xl font-black text-simas-primary-dark mt-1">{fmt(d.nominal)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={cfg.badge}><span className={cfg.dot}/>{cfg.label}</span>
            <Button onClick={onClose} variant="ghost" className="size-8">
              <X className="size-4 text-gray-500"/>
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <div className="card-inner">
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar className="size-3.5 text-gray-400"/>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{d.tanggal}</p>
              <p className="text-xs text-gray-400">{d.waktu}</p>
            </div>
            <div className="card-inner">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag className="size-3.5 text-gray-400"/>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</p>
              </div>
              <span className="pill">{d.kategori}</span>
            </div>
          </div>

          <div className="card-inner">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Metode Pembayaran</p>
            <p className="text-sm font-bold text-gray-800">{d.metode}</p>
          </div>

          {d.wa !== '-' && (
            <div className="card-inner">
              <div className="flex items-center gap-1.5 mb-1">
                <Phone className="size-3.5 text-gray-400"/>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nomor WhatsApp</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{d.wa}</p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bukti Transfer</p>
              <Button variant="ghost" className="flex items-center gap-1 text-xs font-semibold text-simas-primary hover:underline">
                Buka di Tab Baru <ExternalLink className="size-3"/>
              </Button>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 h-48 flex flex-col items-center justify-center gap-2 text-gray-300">
              <div className="size-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Eye className="size-6 text-gray-300"/>
              </div>
              <p className="text-xs font-medium">bukti_{d.id}.jpg</p>
            </div>
          </div>

          {d.catatan && (
            <div className="rounded-2xl border border-amber-100 bg-simas-accent-light p-4">
              <p className="text-xs font-bold text-simas-accent uppercase tracking-wider mb-2">Catatan Donatur</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">"{d.catatan}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 space-y-3">
          {d.status === 'menunggu' ? (
            <>
              <Button onClick={() => onVerify(d.id)} className="btn-verify">
                <CheckCircle2 className="size-4"/> Verifikasi (Terima)
              </Button>
              <Button onClick={() => onReject(d.id)} variant="destructive">
                <XCircle className="size-4"/> Tolak
              </Button>
            </>
          ) : (
            <div className={`w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold ${cfg.badge}`}>
              <cfg.Icon className="size-4"/> Donasi telah {cfg.label.toLowerCase()}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

/* ─── Main Page ──────────────────────────────────────── */
const PER = 6

export default function AdminDonasiPage() {
  const [rows, setRows]     = useState<Donasi[]>(DATA)
  const [q, setQ]           = useState('')
  const [flt, setFlt]       = useState<Status | 'semua'>('semua')
  const [sel, setSel]       = useState<Donasi | null>(null)
  const [page, setPage]     = useState(1)

  const filtered = rows.filter(d => {
    const m = d.nama.toLowerCase().includes(q.toLowerCase()) ||
              d.kategori.toLowerCase().includes(q.toLowerCase()) ||
              d.id.toLowerCase().includes(q.toLowerCase())
    return m && (flt === 'semua' || d.status === flt)
  })

  const pages     = Math.ceil(filtered.length / PER)
  const paginated = filtered.slice((page - 1) * PER, page * PER)

  const totalVerif  = rows.filter(d => d.status === 'terverifikasi').reduce((s, d) => s + d.nominal, 0)
  const cntWaiting  = rows.filter(d => d.status === 'menunggu').length
  const cntVerif    = rows.filter(d => d.status === 'terverifikasi').length

  const STATS = [fmt(totalVerif), String(cntWaiting), String(cntVerif), String(rows.length)]
  const SUBS  = ['Bulan ini', 'Perlu ditinjau', 'Donasi diterima', 'Semua waktu']

  const verify = (id: string) => {
    setRows(r => r.map(d => d.id === id ? { ...d, status: 'terverifikasi' } : d))
    setSel(s => s ? { ...s, status: 'terverifikasi' } : null)
  }
  const reject = (id: string) => {
    setRows(r => r.map(d => d.id === id ? { ...d, status: 'ditolak' } : d))
    setSel(s => s ? { ...s, status: 'ditolak' } : null)
  }

  const FILTERS = [
    { key:'semua' as const,         label:'Semua' },
    { key:'menunggu' as const,      label:'Menunggu' },
    { key:'terverifikasi' as const, label:'Terverifikasi' },
    { key:'ditolak' as const,       label:'Ditolak' },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manajemen Donasi</h1>
          <p className="text-sm text-gray-400 mt-1">Verifikasi & kelola konfirmasi donasi masuk</p>
        </div>
        <button className="btn-primary">
          <Download className="size-4"/> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_ROWS.map(({ iconCls, Icon, label }, i) => (
          <div key={i} className="stat-card">
            <div className={iconCls}><Icon className="size-5"/></div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
              <p className="text-xl font-black text-gray-900">{STATS[i]}</p>
              <p className="text-xs text-gray-400">{SUBS[i]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-800">Riwayat Donasi</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"/>
              <Input placeholder="Cari donatur, kategori..."
                value={q} onChange={e => { setQ(e.target.value); setPage(1) }}
                className="pl-9 h-9 rounded-xl border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-simas-primary focus-visible:ring-0"
              />
            </div>
            <div className="filter-group">
              {FILTERS.map(f => (
                <button key={f.key}
                  onClick={() => { setFlt(f.key); setPage(1) }}
                  className={`filter-tab ${flt === f.key ? 'active' : ''}`}
                >{f.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Header row */}
        <div className="tbl-header">
          {['#', 'Tanggal', 'Donatur', 'Kategori', 'Nominal', 'Metode', 'Status', ''].map(h => (
            <p key={h} className="tbl-th">{h}</p>
          ))}
        </div>

        {/* Data rows - PERBAIKAN ADA DI SINI */}
        {paginated.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-2 text-gray-300">
            <Search className="size-10"/>
            <p className="text-sm font-semibold">Tidak ada data</p>
          </div>
        ) : paginated.map(d => {
          const cfg = S_CFG[d.status]
          return (
            // 🔥 BARIS INI: HAPUS 'group' dan ganti dengan hover langsung
            <div key={d.id} className="tbl-row hover:bg-emerald-50/50" onClick={() => setSel(d)}>
              <p className="text-xs font-mono text-gray-400">{d.id}</p>
              <div>
                <p className="text-xs font-semibold text-gray-700">{d.tanggal}</p>
                <p className="text-xs text-gray-400">{d.waktu}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className={`avatar ${d.avatarBg}`}>{d.inisial}</div>
                <p className="text-sm font-semibold text-gray-800 truncate">{d.nama}</p>
              </div>
              <span className="pill">{d.kategori}</span>
              <p className="nominal">{fmt(d.nominal)}</p>
              <p className="text-xs text-gray-500 truncate">{d.metode}</p>
              <span className={cfg.badge}><span className={cfg.dot}/>{cfg.label}</span>
              <div className="flex justify-end">
                {/* 🔥 BARIS INI: HAPUS 'group-hover:' dan ganti dengan 'hover:' langsung */}
                <Button className="size-7 rounded-lg bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <MoreVertical className="size-3.5 text-gray-400 hover:text-simas-primary"/>
                </Button>
              </div>
            </div>
          )
        })}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            {Math.min((page-1)*PER+1, filtered.length)}–{Math.min(page*PER, filtered.length)} dari {filtered.length} donasi
          </p>
          <div className="flex items-center gap-1.5">
            <Button className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p-1)}>
              <ChevronLeft className="size-4"/>
            </Button>
            {Array.from({length: pages}, (_, i) => i+1).map(p => (
              <Button key={p} onClick={() => setPage(p)} className={`page-btn ${page===p?'active':''}`}>{p}</Button>
            ))}
            <Button className="page-btn" disabled={page >= pages} onClick={() => setPage(p => p+1)}>
              <ChevronRight className="size-4"/>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-over */}
      {sel && <VerifyPanel d={sel} onClose={() => setSel(null)} onVerify={verify} onReject={reject}/>}
    </div>
  )
}