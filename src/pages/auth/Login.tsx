import { useState } from 'react'
import { Eye, EyeOff, AlertCircle, Mail, Lock } from 'lucide-react'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import IslamicPattern from '@/components/login/IslamicPattern'
import MosqueIllustration from '@/components/login/MosqueIllustration'


/* ─── Main component ──────────────────────────────────── */

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    // dummy login logic
    if (email === 'admin@simas.com' && password === '123456') {
      setAuth('dummy-token', {
        id: '1',
        name: 'Admin SIMAS',
        email,
      })

      navigate('/admin') // redirect
    } else {
      setShowError(true)
    }

    setLoading(false)
  }

  return (
    /*
     * `fixed inset-0` → keluar dari width constraint #root di index.css
     * sehingga Login page selalu full-screen.
     */
    <div className="fixed inset-0 flex bg-white">

      {/* ══════════ LEFT SIDEBAR ══════════ */}
      <aside className="
        hidden md:flex md:w-5/12
        flex-col justify-between
        p-10 relative overflow-hidden
        bg-linear-to-br from-simas-primary via-simas-primary-dark to-simas-primary-deep
      ">
        <IslamicPattern />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="
              size-10 rounded-xl flex items-center justify-center
              bg-white/20 backdrop-blur-sm border border-white/30
            ">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M3 21h18" />
                <path d="M5 21V10l7-7 7 7v11" />
                <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <circle cx="12" cy="1" r="1" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wide text-white">SIMAS</span>
          </div>
          <p className="text-emerald-100 text-sm">Panel Administrasi Masjid</p>
        </div>

        {/* Quote + Illustration */}
        <div className="relative z-10 flex flex-col gap-6">
          <blockquote className="border-l-2 border-white/40 pl-4">
            <p className="text-white italic font-semibold text-sm mb-1">
              "Innamal a'malu binniyat"
            </p>
            <p className="text-emerald-100 text-sm leading-relaxed">
              "Sesungguhnya setiap amal bergantung pada niatnya."
            </p>
          </blockquote>
          <MosqueIllustration />
        </div>

        {/* Copyright */}
        <p className="relative z-10 text-emerald-300 text-xs">
          © 2024 Pengurus Masjid Community. All Rights Reserved.
        </p>
      </aside>

      {/* ══════════ RIGHT FORM ══════════ */}
      <main className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto bg-white">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-7">
            <p className="text-gray-500 text-sm mb-1">Selamat Datang Kembali</p>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight" style={{ margin: 0 }}>
              Masuk ke panel administrasi SIMAS
            </h2>
          </div>

          {/* Error alert */}
          {showError && (
            <div className="
              mb-5 px-4 py-3 rounded-xl flex items-center gap-3
              text-sm font-medium text-red-600
              bg-red-50 border border-red-200
            ">
              <AlertCircle className="size-4 shrink-0" />
              Email atau password yang Anda masukkan salah.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Pengurus
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-simas-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@masjid.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="
                    pl-10 h-11 text-sm rounded-xl border-2 transition-colors
                    bg-emerald-50 border-emerald-200
                    focus:bg-white focus:border-simas-primary focus-visible:ring-0
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-simas-primary" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="
                    pl-10 pr-10 h-11 text-sm rounded-xl border-2 transition-colors
                    bg-emerald-50 border-emerald-200
                    focus:bg-white focus:border-simas-primary focus-visible:ring-0
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Lupa password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="size-4 rounded accent-simas-primary"
                />
                <span className="text-sm text-gray-600">Ingat Saya</span>
              </label>
              <a href="#" className="text-sm font-medium text-simas-primary hover:text-simas-primary-dark transition-colors">
                Lupa Password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="
                w-full h-11 mt-1 rounded-xl font-semibold text-sm text-white
                bg-simas-primary hover:bg-simas-primary-dark
                shadow-lg shadow-emerald-500/30
                transition-all active:scale-[0.98]
                disabled:opacity-70 flex items-center justify-center gap-2
              "
            >
              {loading && (
                <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              Masuk Dashboard
            </Button>
          </form>

          {/* Divider */}
          <hr className="my-5 border-gray-200" />

          {/* Help */}
          <p className="text-center text-sm text-gray-500">
            Kesulitan masuk?{' '}
            <a href="#" className="font-semibold text-simas-accent hover:underline">
              Hubungi Admin Pusat
            </a>
          </p>

        </div>
      </main>
    </div>
  )
}