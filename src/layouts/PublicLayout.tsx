import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

const NAV_ITEMS = [
  { title: "Beranda", path: "/" },
  { title: "Donasi", path: "/donation" },
  { title: "Agenda", path: "/agenda" },
  { title: "Galeri", path: "/galeri" },
  { title: "Artikel", path: "/artikel" },
  { title: "Jadwal Sholat", path: "/jadwal-shalat" },
  { title: "Campaigns", path: "/campaigns" },
  { title: "about", path: "/about" },
]

export default function PublicLayout({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🕌</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">SIMAS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-simas-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Desktop */}
            <ThemeToggle />
            <Button asChild className="bg-simas-primary text-white hover:bg-emerald-700 rounded-xl">
              <Link to="/login">Masuk</Link>
            </Button>
          </div>

          {/* Mobile menu area */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Mobile */}
            <ThemeToggle />
            
            <button
              type="button"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-4 pt-2 space-y-1 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-simas-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
            <div className="pt-2">
              <Button asChild className="w-full bg-simas-primary text-white hover:bg-emerald-700 rounded-xl">
                <Link to="/login" onClick={() => setMobileOpen(false)}>Masuk</Link>
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-simas-primary text-emerald-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🕌</span>
                <span className="text-xl font-bold text-white">SIMAS</span>
              </div>
              <p className="text-sm text-emerald-200 dark:text-slate-400 leading-relaxed">
                Sistem Informasi Manajemen Masjid. Memudahkan pengelolaan masjid secara digital dan transparan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Navigasi</h3>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-sm text-emerald-200 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Kontak</h3>
              <ul className="space-y-2 text-sm text-emerald-200 dark:text-slate-400">
                <li>Masjid Raya</li>
                <li>Jl. Contoh No. 123</li>
                <li>Email: info@simas-masjid.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-emerald-600/40 dark:border-slate-800/80 text-center text-sm text-emerald-300 dark:text-slate-500">
            &copy; {new Date().getFullYear()} SIMAS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}