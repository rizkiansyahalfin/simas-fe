import { useState } from 'react'
import { useLogin, useRegister } from './UseAuth';


// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Tab = 'login' | 'register'

// ─────────────────────────────────────────────────────────────────────────────
// Atom components
// ─────────────────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
  </svg>
)

const EyeToggle = ({ visible, onToggle }: { visible: boolean; onToggle: () => void }) => (
  <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
    <span className="material-symbols-outlined">{visible ? 'visibility_off' : 'visibility'}</span>
  </button>
)

const ErrorAlert = ({ message }: { message: string }) => (
  <div className="bg-error-container text-on-error-container p-4 rounded-xl flex items-start gap-3 border border-error/10">
    <span className="material-symbols-outlined text-error">error</span>
    <p className="font-body-sm">{message}</p>
  </div>
)

const PasswordStrength = ({ password }: { password: string }) => {
  if (!password.length) return null
  const score = (password.length >= 8 ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0) + (/[^A-Za-z0-9]/.test(password) ? 1 : 0)
  const trackColor = ['bg-error', 'bg-error', 'bg-secondary', 'bg-primary-fixed-dim', 'bg-primary'][score]
  const label = ['Terlalu lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'][score]
  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`flex-1 h-1 rounded-full transition-all duration-300 ${n <= score ? trackColor : 'bg-surface-container-high'}`} />
        ))}
      </div>
      <p className="font-label-md text-on-surface-variant">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Success overlay — appears after login / register succeeds
// ─────────────────────────────────────────────────────────────────────────────

const SuccessOverlay = ({ name, isRegister }: { name: string; isRegister: boolean }) => (
  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-20 animate-[fadeIn_0.3s_ease]">
    <div className="text-center space-y-6 max-w-xs px-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
      </div>
      <div className="space-y-2 animate-[fadeSlideUp_0.4s_ease_0.2s_both]">
        <h3 className="font-h2 text-on-surface">{isRegister ? 'Akun Berhasil Dibuat!' : 'Masuk Berhasil!'}</h3>
        <p className="font-body-md text-on-surface-variant">
          {isRegister ? `Selamat datang di SIMAS, ${name}. Mengarahkan ke dashboard…` : `Selamat datang kembali, ${name}. Mengarahkan ke dashboard…`}
        </p>
      </div>
      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden animate-[fadeSlideUp_0.4s_ease_0.3s_both]">
        <div className="h-full bg-primary rounded-full animate-[progressBar_1.2s_ease_0.4s_both]" />
      </div>
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// Left panel — Islamic geometric pattern (extracted for modularity)
// ─────────────────────────────────────────────────────────────────────────────

const LeftPanel = () => (
  <section className="hidden md:flex md:w-[40%] islamic-pattern flex-col justify-between p-12 text-on-primary">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
        </div>
        <h1 className="font-h1 text-white tracking-tight">SIMAS</h1>
      </div>
      <p className="font-h3 opacity-90">Panel Administrasi Masjid</p>
    </div>
    <div className="max-w-xs space-y-6">
      <div className="space-y-2 border-l-2 border-white/30 pl-6">
        <blockquote className="italic font-body-lg text-white">"Innamal a'malu binniyat"</blockquote>
        <p className="font-body-sm opacity-80 leading-relaxed">"Sesungguhnya setiap amal bergantung pada niatnya."</p>
      </div>
      <div className="w-full aspect-video rounded-2xl overflow-hidden relative group">
        <img
          alt="Mosque Interior"
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9hfp9AnJjLlTSA48Yh_2u3LJhz1xdKlbtByfs7m1OTzQY34PHh9Sb8EJfZweDZrQVH8ORGHOp2F2g1pToQBKJt6gcBk_MyDbmpaf9Hx9Wkk-baSeYxYFZhuuF3iBUMapMR5wyQz1ztHDkClqHj1aukM2JEHPPeHFFF_iyPtRrKIKML034UQO_RktrdAoM_AbOSYBoXgClpx4gAN3uW0yEKqD5oAT50850plpt4wPtAOa0GPVSCkHwZ1BoDvUnJ4KF-1mLTqhJmnM"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
      </div>
    </div>
    <div className="font-label-md opacity-60">© 2024 Pengurus Masjid Community. All Rights Reserved.</div>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('login')

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Register state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [showRegPw, setShowRegPw] = useState(false)
  const [showRegConfirm, setShowRegConfirm] = useState(false)
  const [confirmError, setConfirmError] = useState('')

  const { mutate: login, isPending: loginPending, isError: loginIsError, error: loginErr, isSuccess: loginSuccess, data: loginData } = useLogin()
  const { mutate: register, isPending: regPending, isError: regIsError, error: regErr, isSuccess: regSuccess, data: regData } = useRegister()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email: loginEmail, password: loginPassword })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (regPassword !== regConfirm) { setConfirmError('Password tidak cocok'); return }
    setConfirmError('')
    register({ name: regName, email: regEmail, password: regPassword })
  }

  const switchTab = (tab: Tab) => { setActiveTab(tab); setConfirmError('') }

  const showSuccess = loginSuccess || regSuccess
  const successName = loginData?.user?.name ?? regData?.user?.name ?? ''
  const apiMsg = (err: unknown) => (err as any)?.response?.data?.message ?? null

  return (
    <main className="w-full flex flex-col md:flex-row min-h-screen">

      {/* Left column — Islamic pattern panel */}
      <LeftPanel />

      {/* Right column — Form area */}
      <section className="flex-1 bg-white flex flex-col items-center justify-center px-container-padding py-section-gap relative">

        {/* Success overlay */}
        {showSuccess && <SuccessOverlay name={successName} isRegister={regSuccess} />}

        {/* Mobile logo — hidden on md+ */}
        <div className="md:hidden absolute top-10 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">mosque</span>
          <span className="font-h2 text-primary">SIMAS</span>
        </div>

        <div className="w-full max-w-md space-y-8">

          {/* Heading group */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="font-h1 text-on-surface">
              {activeTab === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
            </h2>
            <p className="font-body-md text-on-surface-variant">
              {activeTab === 'login' ? 'Masuk ke panel administrasi SIMAS' : 'Daftar sebagai pengurus masjid baru'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl border border-outline-variant overflow-hidden">
            {(['login', 'register'] as Tab[]).map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchTab(tab)}
                className={[
                  'flex-1 py-3 font-label-md flex items-center justify-center gap-2 transition-all duration-200',
                  i > 0 ? 'border-l border-outline-variant' : '',
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
                ].join(' ')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {tab === 'login' ? 'login' : 'person_add'}
                </span>
                {tab === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          {/* Error alert */}
          {(loginIsError || regIsError) && (
            <ErrorAlert
              message={apiMsg(loginIsError ? loginErr : regErr) ?? (activeTab === 'login' ? 'Email atau password yang Anda masukkan salah.' : 'Pendaftaran gagal. Silakan coba lagi.')}
            />
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="email">Email Pengurus</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                  <input id="email" type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="nama@masjid.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50" />
                </div>
              </div>
              {/* Password */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="password">Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input id="password" type={showLoginPw ? 'text' : 'password'} required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50" />
                  <EyeToggle visible={showLoginPw} onToggle={() => setShowLoginPw((v) => !v)} />
                </div>
              </div>
              {/* Remember me + forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer" />
                  </div>
                  <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ingat Saya</span>
                </label>
                <a href="#" className="font-label-md text-primary hover:text-primary-container transition-colors">Lupa Password?</a>
              </div>
              {/* Submit */}
              <button type="submit" disabled={loginPending}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-h3 flex items-center justify-center gap-3 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {loginPending && <Spinner />}
                {loginPending ? 'Memproses...' : 'Masuk Dashboard'}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Nama */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="reg-name">Nama Lengkap</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">badge</span>
                  <input id="reg-name" type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Nama pengurus"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50" />
                </div>
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="reg-email">Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                  <input id="reg-email" type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="nama@masjid.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50" />
                </div>
              </div>
              {/* Password */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="reg-password">Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input id="reg-password" type={showRegPw ? 'text' : 'password'} required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Min. 8 karakter"
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50" />
                  <EyeToggle visible={showRegPw} onToggle={() => setShowRegPw((v) => !v)} />
                </div>
                <PasswordStrength password={regPassword} />
              </div>
              {/* Konfirmasi */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant block ml-1" htmlFor="reg-confirm">Konfirmasi Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock_reset</span>
                  <input id="reg-confirm" type={showRegConfirm ? 'text' : 'password'} required value={regConfirm}
                    onChange={(e) => { setRegConfirm(e.target.value); if (confirmError) setConfirmError('') }}
                    placeholder="Ulangi password"
                    className={`w-full pl-12 pr-12 py-3.5 bg-surface-container-low border rounded-xl font-body-md focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-outline/50 ${confirmError ? 'border-error focus:border-error' : 'border-outline-variant focus:border-primary'}`} />
                  <EyeToggle visible={showRegConfirm} onToggle={() => setShowRegConfirm((v) => !v)} />
                </div>
                {confirmError && (
                  <div className="bg-error-container text-on-error-container px-3 py-2 rounded-xl flex items-center gap-2 border border-error/10">
                    <span className="material-symbols-outlined text-error" style={{ fontSize: 16 }}>warning</span>
                    <p className="font-label-md">{confirmError}</p>
                  </div>
                )}
              </div>
              {/* Submit */}
              <button type="submit" disabled={regPending}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-h3 flex items-center justify-center gap-3 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {regPending && <Spinner />}
                {regPending ? 'Mendaftarkan...' : 'Buat Akun'}
              </button>
            </form>
          )}

          {/* Help link */}
          <div className="pt-8 text-center border-t border-surface-container-highest">
            <p className="font-body-sm text-on-surface-variant">
              Kesulitan masuk?{' '}
              <a href="#" className="text-primary font-label-md hover:underline decoration-2 underline-offset-4">Hubungi Admin Pusat</a>
            </p>
          </div>
        </div>

        {/* Mobile bottom decoration */}
        <div className="md:hidden mt-auto w-full pt-12">
          <div className="h-1 w-24 bg-primary mx-auto rounded-full opacity-20" />
        </div>
      </section>

      <style>{`
        @keyframes fadeIn      { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn     { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes fadeSlideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes progressBar { from { width: 0% } to { width: 100% } }
      `}</style>
    </main>
  )
}

export default LoginPage