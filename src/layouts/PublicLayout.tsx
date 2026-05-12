import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface PublicLayoutProps {
  children?: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    /*
     * `fixed inset-0 overflow-auto` → keluar dari constraint #root (width: 1126px)
     * sehingga PublicLayout selalu full-screen, sama seperti AdminLayout & Login.
     */
    <div className="fixed inset-0 overflow-auto flex flex-col bg-emerald-50 text-slate-900">

      {/* ── Header ── */}
     <header className="shadow-sm bg-white">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

    {/* Logo */}
    <div className="flex items-center gap-8">
      <span className="text-lg font-bold text-emerald-700">
        SIMAS
      </span>

      {/* Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm ">
        <Link to="/berita" className="text-gray-600 hover:text-emerald-600">
          Berita
        </Link>
        <Link to="/jadwal-shalat" className="text-gray-600 hover:text-emerald-600">
          Jadwal Shalat
        </Link>
        <Link to="/donasi" className="text-gray-600 hover:text-emerald-600">
          Donasi
        </Link>
        <Link to="/transparansi" className="text-gray-600 hover:text-emerald-600">
          Transparansi Keuangan
        </Link>
      </nav>
    </div>

    {/* Login Button */}
    <Link
      to="/login"
      className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition"
    >
      ➜ Masuk Pengurus
    </Link>

  </div>
</header>

      {/* ── Main ── */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8">
        {children ?? (
          <div className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-normal" style={{ margin: 0 }}>
              Selamat Datang di SIMAS
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sistem Manajemen Masjid — pilih menu di atas untuk mulai.
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="shrink-0 border-t border-emerald-200 bg-white py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} SIMAS Masjid
      </footer>
    </div>
  )
}