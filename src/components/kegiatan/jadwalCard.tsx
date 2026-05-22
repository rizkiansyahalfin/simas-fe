import  Button  from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Plus } from 'lucide-react'
import { type JadwalJumat } from "@/types/kegiatan"
import { STATUS_CFG } from "@/data/kegiatanSeed"
import { Mic } from 'lucide-react'
import { Users } from 'lucide-react'
import { Volume2 } from 'lucide-react'

function RoleIcon({ role }: { role: 'khatib' | 'imam' | 'muadzin' }) {
  const map = { khatib: Mic, imam: Users, muadzin: Volume2 }
  const Icon = map[role]
  return (
    <div className="jumat-role-icon">
      <Icon className="size-3.5 text-simas-primary-dark" />
    </div>
  )
}

export function JadwalCard({
  item, onEdit, onDelete
}: {
  item: JadwalJumat
  onEdit: (item: JadwalJumat) => void
  onDelete: (id: string) => void
}) {
  const s = STATUS_CFG[item.status]
  const isEmpty = !item.khatib && !item.imam && !item.muadzin

  return (
    <div className={`jumat-card ${item.status === 'mendatang' ? 'jumat-card-highlight' : ''}`}>
      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="jumat-minggu-label">MINGGU KE-{item.minggu}</p>
          <h3 className="jumat-card-date">{item.tanggal}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={s.cls}>
            <span className={s.dot}/>{s.label}
          </span>
          <Button variant="ghost" size="icon" onClick={() => onEdit(item)} className="jumat-action-btn">
            <Pencil className="size-3.5"/>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)} className="jumat-action-btn jumat-action-delete">
            <Trash2 className="size-3.5"/>
          </Button>
        </div>
      </div>

      {/* Roles */}
      <div className="space-y-3 mb-4">
        {(['khatib','imam','muadzin'] as const).map(role => (
          <div key={role} className="flex items-center gap-3">
            <RoleIcon role={role} />
            <div>
              <p className="jumat-role-label">{role.toUpperCase()}</p>
              <p className={`jumat-role-name ${!item[role] ? 'jumat-role-empty' : ''}`}>
                {item[role] || '—'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tema */}
      <div className="jumat-tema-box">
        <p className="jumat-role-label mb-1">TEMA KHUTBAH</p>
        <p className={`text-sm italic ${item.tema ? 'text-gray-700' : 'jumat-role-empty'}`}>
          {item.tema ? `"${item.tema}"` : '—'}
        </p>
      </div>

      {isEmpty && (
        <Button variant="outline" onClick={() => onEdit(item)} className="jumat-fill-btn">
          <Plus className="size-3.5"/> Isi Jadwal
        </Button>
      )}
    </div>
  )
}