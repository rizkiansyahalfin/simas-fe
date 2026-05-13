import { useState } from 'react'
import {
  Search, Download, MoreVertical,
  CheckCircle2,
  ChevronLeft, ChevronRight,
  Wallet, Users, AlertCircle
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Donasi, Status } from '@/types/donation'
import VerifyPanel from '@/components/donation/verifyPanel'
import { SEED } from '@/data/donationSeed'
import { STATUS_CFG } from '@/data/donationSeed'

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')


/* ─── Main ─── */
const PER_PAGE = 6

const STAT_ROWS = [
  { icon:Wallet,       label:'Total Terverifikasi', wrap:'icon-wrap icon-wrap-green',  sub:'Bulan ini' },
  { icon:AlertCircle,  label:'Menunggu Verifikasi',  wrap:'icon-wrap icon-wrap-amber',  sub:'Perlu ditinjau' },
  { icon:CheckCircle2, label:'Telah Diverifikasi',   wrap:'icon-wrap icon-wrap-blue',   sub:'Donasi diterima' },
  { icon:Users,        label:'Total Donatur',         wrap:'icon-wrap icon-wrap-purple', sub:'Semua waktu' },
]

const FILTERS: { key: Status | 'semua'; label: string }[] = [
  { key:'semua', label:'Semua' },
  { key:'menunggu', label:'Menunggu' },
  { key:'terverifikasi', label:'Terverifikasi' },
  { key:'ditolak', label:'Ditolak' },
]

export default function AdminDonasiPage() {
  const [data, setData]           = useState<Donasi[]>(SEED)
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilter] = useState<Status | 'semua'>('semua')
  const [selected, setSelected]   = useState<Donasi | null>(null)
  const [page, setPage]           = useState(1)

  const filtered = data.filter(d => {
    const q = search.toLowerCase()
    const matchQ = d.nama.toLowerCase().includes(q) || d.kategori.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
    const matchS = filterStatus === 'semua' || d.status === filterStatus
    return matchQ && matchS
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const rows       = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const menunggu      = data.filter(d => d.status === 'menunggu').length
  const terverifikasi = data.filter(d => d.status === 'terverifikasi').length
  const totalNominal  = data.filter(d => d.status === 'terverifikasi').reduce((s, d) => s + d.nominal, 0)
  const statValues    = [fmt(totalNominal), String(menunggu), String(terverifikasi), String(data.length)]

  const handleVerify = (id: string) => {
    setData(p => p.map(d => d.id === id ? { ...d, status: 'terverifikasi' } : d))
    setSelected(p => p ? { ...p, status: 'terverifikasi' } : null)
  }
  const handleTolak = (id: string) => {
    setData(p => p.map(d => d.id === id ? { ...d, status: 'ditolak' } : d))
    setSelected(p => p ? { ...p, status: 'ditolak' } : null)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manajemen Donasi</h1>
          <p className="text-sm text-gray-400 mt-1">Verifikasi & kelola konfirmasi donasi masuk</p>
        </div>
        <Button className="btn-primary">
          <Download className="size-4"/> Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_ROWS.map(({ icon:Icon, label, wrap, sub }, i) => (
          <div key={i} className="stat-card">
            <div className={wrap}><Icon className="size-5"/></div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
              <p className="text-xl font-black text-gray-900">{statValues[i]}</p>
              <p className="text-xs text-gray-400">{sub}</p>
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
              <Input
                placeholder="Cari donatur, kategori..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="pl-9 h-9 rounded-xl border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-simas-primary focus-visible:ring-0"
              />
            </div>
            <div className="filter-group">
              {FILTERS.map(f => (
                <Button key={f.key}
                  onClick={() => { setFilter(f.key); setPage(1) }}
                  className={`filter-tab ${filterStatus === f.key ? 'active' : ''}`}
                >{f.label}</Button>
              ))}
            </div>
          </div>
        </div>

        {/* Table head */}
        <div className="tbl-header">
          {['#','Tanggal','Donatur','Kategori','Nominal','Metode','Status',''].map(h => (
            <span key={h} className="tbl-th">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-2 text-gray-300">
            <Search className="size-10"/>
            <p className="text-sm font-semibold">Tidak ada data ditemukan</p>
          </div>
        ) : rows.map(d => {
          const s = STATUS_CFG[d.status]
          return (
            <div key={d.id} className="tbl-row group" onClick={() => setSelected(d)}>
              <span className="text-xs font-mono text-gray-400">{d.id}</span>
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
              <div className="flex items-center justify-between">
                <span className={s.badge}>
                  <span className={s.dot}/><span className="hidden lg:inline">{s.label}</span>
                </span>
                <Button className="size-7 rounded-lg bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <MoreVertical className="size-3.5 text-gray-400 group-hover:text-simas-primary"/>
                </Button>
              </div>
            </div>
          )
        })}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            Menampilkan {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} dari {filtered.length} donasi
          </p>
          <div className="flex items-center gap-1.5">
            <Button className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p-1)}>
              <ChevronLeft className="size-4"/>
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
                <Button key={p} onClick={() => setPage(p)} className={`page-btn ${page===p ? 'active' : ''}`}>{p}</Button >
                ))}
                <Button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p+1)}>
              <ChevronRight className="size-4"/>
            </Button>
          </div>
        </div>
      </div>

      {/* Panel */}
      {selected && (
        <VerifyPanel
          d={selected}
          onClose={() => setSelected(null)}
          onVerify={handleVerify}
          onTolak={handleTolak}
        />
      )}
    </div>
  )
}
