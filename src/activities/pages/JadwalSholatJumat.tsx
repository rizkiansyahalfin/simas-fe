import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { Check } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Download } from 'lucide-react'
import { Info } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import Button from '@/components/ui/button'
import { type JadwalJumat } from '@/activities/types/kegiatan'
import { SEED } from '@/activities/data/kegiatanSeed'
import { JadwalCard } from '@/activities/components/jadwalCard'
import { JadwalModal } from '@/activities/components/jadwalModal'
import { JumatBanner } from '@/activities/components/jumatBanner'

const BULAN_LIST = ['Oktober 2026','November 2026','Desember 2026','Januari 2027']



/* ─── Main Page ─── */
export default function JadwalJumatPage() {
  const [data, setData]         = useState<JadwalJumat[]>(SEED)
  const [bulan, setBulan]       = useState('Oktober 2023')
  const [showBulan, setShowBulan] = useState(false)
  const [modal, setModal]       = useState<'add' | JadwalJumat | null>(null)
  const [delConfirm, setDelConfirm] = useState<string | null>(null)

  const terisi   = data.filter(d => d.khatib && d.imam && d.muadzin).length
  const pctTerisi = Math.round((terisi / data.length) * 100)

  const handleSave = (saved: JadwalJumat) => {
    setData(prev => {
      const exists = prev.find(d => d.id === saved.id)
      return exists ? prev.map(d => d.id === saved.id ? saved : d) : [...prev, saved]
    })
    setModal(null)
  }

  const handleDelete = (id: string) => {
    setData(p => p.filter(d => d.id !== id))
    setDelConfirm(null)
  }

  return (
    <div className="space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Jadwal Shalat Jum'at</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola daftar khatib, imam, dan muadzin mingguan.</p>
        </div>
        <Button onClick={() => setModal('add')} className="btn-primary">
          <Plus className="size-4"/> Tambah Jadwal
        </Button>
      </div>

      {/* ── Bulan selector ── */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Button variant="outline" onClick={() => setShowBulan(v => !v)} className="jumat-bulan-btn">
            <Calendar className="size-4 text-gray-400"/>
            {bulan}
            <ChevronDown className={`size-4 text-gray-400 transition-transform ${showBulan ? 'rotate-180' : ''}`}/>
          </Button>
          {showBulan && (
            <div className="absolute z-20 mt-1.5 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden w-52">
              {BULAN_LIST.map(b => (
                <Button key={b} variant="ghost" onClick={() => { setBulan(b); setShowBulan(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${bulan === b ? 'bg-emerald-50 text-simas-primary font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {b}{bulan === b && <Check className="size-3.5 text-simas-primary"/>}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" className="page-btn"><ChevronLeft className="size-4"/></Button>
          <Button variant="outline" className="page-btn"><ChevronRight className="size-4"/></Button>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map(item => (
          <JadwalCard key={item.id} item={item}
            onEdit={setModal}
            onDelete={(id) => setDelConfirm(id)}
          />
        ))}

        {/* Add card */}
        <Button onClick={() => setModal('add')} className="jumat-add-card">
          <div className="jumat-add-icon"><Plus className="size-6 text-simas-primary"/></div>
          <p className="text-sm font-semibold text-gray-500">Tambah Minggu Baru</p>
          <p className="text-xs text-gray-400">Klik untuk menambah jadwal</p>
        </Button>
      </div>

      {/* ── Bottom section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <JumatBanner />
        {/* Capaian card */}
        <div className="card-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Capaian Petugas</h3>
            <Button className="size-7 rounded-full bg-gray-100 flex items-center justify-center">
              <Info className="size-3.5 text-gray-400"/>
            </Button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Terisi</span>
            <span className="text-sm font-black text-simas-primary">{pctTerisi}%</span>
          </div>
          <div className="progress-track mb-3">
            <div className="progress-fill progress-fill-green" style={{ width: `${pctTerisi}%` }}/>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            {terisi} dari {data.length} minggu telah memiliki petugas lengkap.
            {pctTerisi < 100 && ' Tingkatkan pengisian jadwal untuk mempermudah koordinasi.'}
          </p>

          <Button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="size-4"/> Unduh Rekap Laporan
          </Button>
        </div>
      </div>

      {/* ── Modal ── */}
      {modal !== null && (
        <JadwalModal
          initial={modal === 'add' ? null : modal}
          isNew={modal === 'add'}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Delete confirm ── */}
      {delConfirm && (
        <>
          <div className="panel-backdrop" onClick={() => setDelConfirm(null)}/>
          <div className="jumat-confirm">
            <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="size-5 text-red-500"/>
            </div>
            <h3 className="text-base font-black text-gray-900 text-center mb-1">Hapus Jadwal?</h3>
            <p className="text-sm text-gray-400 text-center mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDelConfirm(null)}
                className="flex-1 h-10 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                Batal
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(delConfirm)}
                className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer">
                Hapus
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}