import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import Button from "@/components/ui/button"

interface PublicLayoutProps {
  children?: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 text-slate-900">
      <header className="border-b border-emerald-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link className="rounded-lg bg-emerald-600 px-3 py-2 font-semibold text-white" to="/">
            SIMAS Masjid
          </Link>

          <nav className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/agenda">Agenda</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/berita">Berita</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/auth">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {children ?? (
          <div className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
            <h1 className="m-0 text-2xl font-semibold tracking-normal">
              Public Layout
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Area konten halaman public.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-emerald-200 bg-white py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} SIMAS Masjid
      </footer>
    </div>
  )
}
