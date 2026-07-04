import { useState } from "react"
import { Check } from 'lucide-react'
import { Mic } from 'lucide-react'
import { Users } from 'lucide-react'
import { Volume2 } from 'lucide-react'
import { BookOpen } from 'lucide-react'
import { X } from 'lucide-react'
import type { JadwalJumat } from "@/activities/types/kegiatan"
import { STATUS_CFG } from "@/activities/data/kegiatanSeed"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"




const emptyForm = (): Omit<JadwalJumat,'id'> => ({
  minggu: 1, tanggal: '', status: 'mendatang',
  khatib: '', imam: '', muadzin: '', tema: '',
})

export function JadwalModal({
  initial, onSave, onClose, isNew
}: {
  initial: JadwalJumat | null
  onSave: (data: JadwalJumat) => void
  onClose: () => void
  isNew: boolean
}) {
  const [form, setForm] = useState<JadwalJumat>(() =>
  initial ?? { id: `J${Date.now()}`, ...emptyForm() }
)

  const set = (k: keyof JadwalJumat, v: string | number) =>
    setForm(p => ({ ...p, [k]: v }))

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const ROLES: { key: 'khatib' | 'imam' | 'muadzin'; label: string; Icon: React.ElementType }[] = [
    { key:'khatib',  label:'Nama Khatib',  Icon:Mic     },
    { key:'imam',    label:'Nama Imam',    Icon:Users   },
    { key:'muadzin', label:'Nama Muadzin', Icon:Volume2 },
  ]

  return (
    <>
      <div className="panel-backdrop" onClick={onClose}/>
      <div className="jumat-modal">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {isNew ? 'Tambah Jadwal' : 'Edit Jadwal'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isNew ? 'Buat jadwal shalat Jumat baru' : `Minggu ke-${form.minggu} — ${form.tanggal}`}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="size-4 text-gray-500"/>
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Tanggal & Minggu */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="jumat-label">Tanggal</label>
              <Input value={form.tanggal} onChange={e => set('tanggal', e.target.value)}
                placeholder="Jum'at, 13 Okt 2023" required
                className="jumat-input"/>
            </div>
            <div>
              <label className="jumat-label">Minggu ke-</label>
              <Input type="number" min={1} max={5} value={form.minggu} onChange={e => set('minggu', Number(e.target.value))}
                className="jumat-input"/>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="jumat-label">Status</label>
            <div className="flex gap-2">
              {(['mendatang','selesai','berlangsung'] as const).map(s => (
                <Button key={s} variant="outline" onClick={() => set('status', s)}
                  className={`jumat-status-btn ${form.status === s ? 'jumat-status-btn-active' : ''}`}>
                  {form.status === s && <Check className="size-3"/>}
                  {STATUS_CFG[s].label}
                </Button>
              ))}
            </div>
          </div>

          {/* Roles */}
          {ROLES.map(({ key, label, Icon }) => (
            <div key={key}>
              <label className="jumat-label flex items-center gap-1.5">
                <Icon className="size-3.5 text-simas-primary"/> {label}
              </label>
              <Input value={form[key]} onChange={e => set(key, e.target.value)}
                placeholder={`Nama ${label.toLowerCase()}...`}
                className="jumat-input"/>
            </div>
          ))}

          {/* Tema */}
          <div>
            <label className="jumat-label flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-simas-primary"/> Tema Khutbah
            </label>
            <Input value={form.tema} onChange={e => set('tema', e.target.value)}
              placeholder="Tema khutbah Jumat..."
              className="jumat-input"/>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer">
            Batal
          </Button>
          <Button onClick={handleSave} className="btn-primary flex-1 justify-center">
            <Check className="size-4"/> Simpan Jadwal
          </Button>
        </div>
      </div>
    </>
  )
}