import { useState } from 'react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { RefreshCw } from 'lucide-react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { AdminUser, Role } from '@/types/adminUser'
import { ROLE_CFG } from '@/data/userManagementSeed'
import Button from '@/components/ui/button'



/* ─── Helpers ─── */
function getInisial(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('')
}

function genPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const AVATAR_COLORS: Record<Role, string> = {
  superadmin: 'bg-violet-600',
  bendahara:  'bg-sky-600',
  sekretaris: 'bg-emerald-600',
  operator:   'bg-amber-600',
}

const ROLE_OPTIONS: { value: Role; label: string; desc: string }[] = [
  { value: 'bendahara',  label: 'Bendahara',  desc: 'Keuangan, zakat, laporan dana' },
  { value: 'sekretaris', label: 'Sekretaris', desc: 'Artikel, kegiatan, data jamaah' },
  { value: 'operator',   label: 'Operator',   desc: 'Donasi, inventaris, jadwal' },
]

/* ─── Props ─── */
interface Props {
  initial?: AdminUser
  onSave: (user: AdminUser) => void
  onClose: () => void
}

/*
 * TODO (saat integrasi API nanti):
 * - Ganti onSave() dengan mutasi ke POST /api/users atau PUT /api/users/:id
 * - Password hanya dikirim saat create (isNew), bukan edit
 * - Checkbox "kirim email" trigger endpoint POST /api/users/:id/send-credentials
 * - Role superadmin tidak boleh dibuat dari sini (sudah difilter di ROLE_OPTIONS)
 */

export default function AddUserModal({ initial, onSave, onClose }: Props) {
  const isNew = !initial

  const [name,      setName]      = useState(initial?.name ?? '')
  const [email,     setEmail]     = useState(initial?.email ?? '')
  const [role,      setRole]      = useState<Role>(initial?.role ?? 'operator')
  const [password,  setPassword]  = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [sendEmail, setSendEmail] = useState(true)
  const [showRole,  setShowRole]  = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    /*
     * TODO: Di sini nanti panggil API — sementara simpan ke state lokal saja.
     * Kalau isNew  → POST /api/users { name, email, role, password }
     * Kalau !isNew → PUT  /api/users/:id { name, email, role }
     * Setelah sukses → panggil onSave(responseData)
     */

    const saved: AdminUser = {
      id:        initial?.id ?? `USR-${Date.now()}`,
      name,
      email,
      role,
      status:    initial?.status ?? 'aktif',
      inisial:   getInisial(name),
      avatarBg:  AVATAR_COLORS[role],
      createdAt: initial?.createdAt ?? new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }),
    }

    onSave(saved)
  }

  return (
    <>
     <div className="panel-backdrop" onClick={onClose} />

  <div className="um-modal">

    {/* Header */}
    <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
      <div className="space-y-1">
        <h2 className="text-xl font-black text-gray-900">
          {isNew ? 'Tambah Pengurus Baru' : 'Edit Pengurus'}
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed max-w-md">
          {isNew
            ? 'Lengkapi data untuk mendaftarkan akun pengurus baru.'
            : `Perbarui data akun ${initial?.name}.`}
        </p>
      </div>

      <button
        onClick={onClose}
        title='close'
        type="button"
        className="size-9 rounded-2xl bg-gray-100 hover:bg-gray-200
                   flex items-center justify-center transition-colors
                   shrink-0 ml-4"
      >
        <X className="size-4 text-gray-500" />
      </button>
    </div>

    {/* Form */}
    <form onSubmit={handleSave} className="um-form">

      {/* Nama */}
      <div className="um-field">
        <label className="um-label">Nama Lengkap</label>

        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Masukkan nama lengkap"
          required
          className="um-input"
        />
      </div>

      {/* Email & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Email */}
        <div className="um-field">
          <label className="um-label">Email Kerja</label>

          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="contoh@simas.org"
            required
            className="um-input"
          />
        </div>

        {/* Role */}
        <div className="um-field relative">
          <label className="um-label">Peran (Role)</label>

          <button
            type="button"
            onClick={() => setShowRole(v => !v)}
            className={`um-select-trigger ${showRole ? 'open' : ''}`}
          >
            <span className={role ? 'font-semibold text-gray-800' : 'text-gray-400'}>
              {role ? ROLE_CFG[role].label : 'Pilih Role'}
            </span>

            <svg
              className={`size-4 text-gray-400 transition-transform duration-200 ${
                showRole ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {showRole && (
            <div className="um-select-menu">
              {ROLE_OPTIONS.map(r => (
                <Button
                  key={r.value}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setRole(r.value)
                    setShowRole(false)
                  }}
                  className={`um-select-item ${
                    role === r.value ? 'um-select-item-active' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <p className="um-select-title">
                      {r.label}
                    </p>

                    <p className="um-select-desc">
                      {r.desc}
                    </p>
                  </div>

                  {role === r.value && (
                    <Check className="size-4 text-simas-primary shrink-0 mt-0.5" />
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Password */}
      {isNew && (
        <div className="um-field">

          <div className="flex items-center justify-between">
            <label className="um-label">Password Awal</label>

            <span className="text-xs font-medium text-gray-400">
              Minimal 8 karakter
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* Input */}
            <div className="um-password-wrap">
              <Input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password awal"
                minLength={8}
                required
                className="um-input pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="um-password-toggle"
              >
                {showPw
                  ? <EyeOff className="size-4" />
                  : <Eye className="size-4" />
                }
              </button>
            </div>

            {/* Generate */}
            <button
              type="button"
              onClick={() => setPassword(genPassword())}
              className="um-gen-btn"
            >
              <RefreshCw className="size-3.5 shrink-0" />
              Generate Otomatis
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Password sementara — integrasi API akan mengirim ke server.
          </p>
        </div>
      )}

      {/* Checkbox */}
      {isNew && (
        <label className="um-checkbox-row">
          <div
            className={`um-checkbox ${sendEmail ? 'um-checkbox-on' : ''}`}
            onClick={() => setSendEmail(v => !v)}
          >
            {sendEmail && (
              <Check className="size-3 text-white" />
            )}
          </div>

          <span className="text-sm leading-relaxed text-gray-700 select-none">
            Kirim email berisi kredensial ke pengguna ini.
          </span>
        </label>
      )}

      {/* Info */}
      <div className="info-box">
        <div className="info-box-icon">
          <Send className="size-4 text-amber-600" />
        </div>

        <p className="text-xs text-amber-700 leading-relaxed">
          {isNew
            ? 'Akun yang dibuat saat ini baru tersimpan di data lokal. Setelah integrasi API, akun akan langsung aktif dan pengguna bisa login dengan email & password yang diisi.'
            : 'Perubahan saat ini tersimpan di data lokal. Setelah integrasi API, perubahan akan langsung sinkron ke server.'}
        </p>
      </div>
    </form>

    {/* Footer */}
    <div className="um-footer">
      <Button
        type="button"
        onClick={onClose}
        className="jamaah-cancel-btn flex-1"
      >
        Batal
      </Button>

      <Button
        onClick={handleSave}
        className="btn-primary flex-1 justify-center"
      >
        {isNew ? (
          <>
            <Check className="size-4" />
            Simpan Pengurus
          </>
        ) : (
          <>
            <Check className="size-4" />
            Simpan Perubahan
          </>
        )}
      </Button>
    </div>
  </div>
    </>
  )
}