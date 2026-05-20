import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import AddUserModal from '@/components/userManage/userManageModal'
import type { Role, AdminUser } from '@/types/adminUser'
import { SEED, ROLE_CFG } from '@/data/userManagementSeed'




const ROLE_TABS: { key: Role | 'semua'; label: string }[] = [
  { key: 'semua',      label: 'Semua Pengguna' },
  { key: 'superadmin', label: 'Superadmin' },
  { key: 'bendahara',  label: 'Bendahara' },
  { key: 'sekretaris', label: 'Sekretaris' },
  { key: 'operator',   label: 'Operator' },
]


const PER_PAGE = 5

export default function UserManagementPage() {
  const [data, setData]       = useState<AdminUser[]>(SEED)
  const [search, setSearch]   = useState('')
  const [roleTab, setRoleTab] = useState<Role | 'semua'>('semua')
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null)
  const [delId, setDelId]     = useState<string | null>(null)
  const [page, setPage]       = useState(1)

  const filtered = data.filter(d => {
    const q = search.toLowerCase()
    const mQ = d.name.toLowerCase().includes(q) || d.email.toLowerCase().includes(q)
    const mR = roleTab === 'semua' || d.role === roleTab
    return mQ && mR
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const counts = {
    semua:      data.length,
    superadmin: data.filter(d => d.role === 'superadmin').length,
    bendahara:  data.filter(d => d.role === 'bendahara').length,
    sekretaris: data.filter(d => d.role === 'sekretaris').length,
    operator:   data.filter(d => d.role === 'operator').length,
  }

  const handleAdd = (user: AdminUser) => {
    setData(p => [...p, user])
    setShowAdd(false)
  }

  const handleEdit = (user: AdminUser) => {
    setData(p => p.map(d => d.id === user.id ? user : d))
    setEditTarget(null)
  }

  const handleDelete = (id: string) => {
    setData(p => p.filter(d => d.id !== id))
    setDelId(null)
  }

  const toggleStatus = (id: string) => {
    setData(p => p.map(d =>
      d.id === id ? { ...d, status: d.status === 'aktif' ? 'nonaktif' : 'aktif' } : d
    ))
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-400 mt-1">
            Kelola hak akses dan data pengurus masjid dengan aman.
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary">
          <Plus className="size-4" /> Tambah Pengurus Baru
        </button>
      </div>

      {/* Role tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {ROLE_TABS.map(tab => (
          <button key={tab.key}
            onClick={() => { setRoleTab(tab.key); setPage(1) }}
            className={`um-role-tab ${roleTab === tab.key ? 'um-role-tab-active' : ''}`}>
            {tab.label}
            <span className={`um-role-tab-count ${roleTab === tab.key ? 'um-role-tab-count-active' : ''}`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="card overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Cari nama atau email..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-simas-primary focus-visible:ring-0"
            />
          </div>
          <p className="ml-auto text-xs text-gray-400">{filtered.length} pengguna</p>
        </div>

        {/* Table head */}
        <div className="um-tbl-header">
          <span className="tbl-th">Pengguna</span>
          <span className="tbl-th">Peran</span>
          <span className="tbl-th">Status</span>
          <span className="tbl-th">Bergabung</span>
          <span className="tbl-th text-right">Aksi</span>
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-2 text-gray-300">
            <Search className="size-10" />
            <p className="text-sm font-semibold">Tidak ada pengguna ditemukan</p>
          </div>
        ) : rows.map(u => {
          const rc = ROLE_CFG[u.role]
          return (
            <div key={u.id} className="um-tbl-row">
              <div className="flex items-center gap-3">
                <div className={`avatar ${u.avatarBg}`}>{u.inisial}</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
              </div>
              <span className={rc.badgeCls}>{rc.label}</span>
              <div className="flex items-center gap-2">
                {u.status === 'aktif'
                  ? <span className="um-status-aktif">Aktif</span>
                  : <span className="um-status-nonaktif">Nonaktif</span>
                }
                {u.role !== 'superadmin' && (
                  <button onClick={() => toggleStatus(u.id)} className="text-xs text-gray-400 hover:text-simas-primary transition-colors">
                    {u.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">{u.createdAt}</p>
              <div className="flex items-center justify-end gap-1.5">
                {u.role !== 'superadmin' ? (
                  <>
                    <button title="Edit" onClick={() => setEditTarget(u)} className="jamaah-act-btn">
                      <Pencil className="size-4" />
                    </button>
                    <button title="Hapus" onClick={() => setDelId(u.id)} className="um-del-btn">
                      <Trash2 className="size-4" />
                    </button    >
                  </>
                ) : (
                  <span className="text-xs text-gray-300 italic pr-2">Dilindungi</span>
                )}
              </div>
            </div>
          )
        })}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            Menampilkan{' '}
            <strong>{Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)}</strong>{' '}
            dari <strong>{filtered.length}</strong> pengguna
          </p>
          <div className="flex items-center gap-1.5">
            <button title='btn' className="page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`page-btn ${page === p ? 'active' : ''}`}>{p}</button>
            ))}
            <button title='btn' className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <AddUserModal onSave={handleAdd} onClose={() => setShowAdd(false)} />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <AddUserModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* Delete confirm */}
      {delId && (
        <>
          <div className="panel-backdrop" onClick={() => setDelId(null)} />
          <div className="jumat-confirm">
            <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="size-5 text-red-500" />
            </div>
            <h3 className="text-base font-black text-gray-900 text-center mb-1">Hapus Pengurus?</h3>
            <p className="text-sm text-gray-400 text-center mb-5">
              Akun akan dihapus permanen. Untuk saat ini hanya data lokal yang terhapus —
              integrasi API akan ditambahkan nanti.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)}
                className="flex-1 h-10 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                Batal
              </button>
              <button onClick={() => handleDelete(delId)}
                className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors cursor-pointer">
                Hapus
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}