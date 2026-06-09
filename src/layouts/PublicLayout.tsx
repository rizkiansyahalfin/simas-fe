import { useState, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTranslate } from "@/i18n/hooks/useTranslate"

export default function PublicLayout({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { t, navItems } = useTranslate()

  const closeMobileMenu = useCallback(() => setMobileOpen(false), [])
  const toggleMobileMenu = useCallback(() => setMobileOpen(prev => !prev), [])

  const isNavActive = useCallback((path: string) => location.pathname === path, [location.pathname])

  const navLinkClass = (isActive: boolean) => {
    const baseClass = "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
    return isActive
      ? `${baseClass} bg-emerald-50 dark:bg-emerald-900/30 text-simas-primary font-semibold`
      : `${baseClass} text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white`
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🕌</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">SIMAS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={navLinkClass(isNavActive(item.path))}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button asChild className="bg-simas-primary text-white hover:bg-emerald-700 rounded-lg font-medium">
              <Link to="/login">{t('nav.login')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block ${navLinkClass(isNavActive(item.path))}`}
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 dark:border-slate-700 mt-3">
                <Button asChild className="w-full bg-simas-primary text-white hover:bg-emerald-700 rounded-lg font-medium">
                  <Link to="/login" onClick={closeMobileMenu}>{t('nav.login')}</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-slate-950">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-simas-primary text-emerald-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🕌</span>
                <span className="text-xl font-bold text-white">SIMAS</span>
              </div>
              <p className="text-sm text-emerald-200 dark:text-slate-400 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className="text-sm text-emerald-200 dark:text-slate-400 hover:text-white dark:hover:text-emerald-300 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.contact')}</h3>
              <ul className="space-y-2 text-sm text-emerald-200 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>{t('footer.address')}: Jl. Contoh No. 123</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✉️</span>
                  <span>{t('footer.email')}: info@simas-masjid.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-emerald-600/40 dark:border-slate-800/80 pt-6 text-center text-sm text-emerald-300 dark:text-slate-500">
            &copy; {new Date().getFullYear()} SIMAS. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  )
}