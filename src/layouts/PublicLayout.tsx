import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { CalendarDays, Landmark, LogIn, Megaphone } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PublicLayoutProps {
  children?: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Landmark className="size-5" />
            </span>
            <span>
             a <span className="block text-base font-semibold leading-tight">
                SIMAS Masjid
              </span>
              <span className="block text-xs text-slate-500">
                Sistem Informasi Masjid
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost">
              <Link to="/">Beranda</Link>
            </Button>
            <Button variant="ghost">Agenda</Button>
            <Button variant="ghost">Berita</Button>
            <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
              <Link to="/auth">
                <LogIn className="size-4" />
                Masuk
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-8 px-5 py-8 sm:px-6 lg:px-8">
        {children ?? (
          <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                <Megaphone className="size-4" />
                Portal layanan dan informasi masjid
              </span>
              <div className="space-y-3">
                <h1 className="m-0 max-w-3xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
                  Kelola informasi masjid dengan rapi, cepat, dan mudah diakses.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  SIMAS membantu jamaah melihat agenda, berita, dan informasi
                  layanan masjid melalui tampilan publik yang bersih.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link to="/admin">Lihat Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/auth">Masuk Admin</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3 border-b pb-4">
                <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <CalendarDays className="size-5" />
                </span>
                <div>
                  <h2 className="m-0 text-lg font-semibold text-slate-950">
                    Agenda Terdekat
                  </h2>
                  <p className="text-sm text-slate-500">Kegiatan pekan ini</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Kajian Subuh", "Santunan Jumat", "Rapat Pengurus"].map(
                  (item) => (
                    <div
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                      key={item}
                    >
                      <span className="font-medium text-slate-800">{item}</span>
                      <span className="text-sm text-emerald-700">Aktif</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-emerald-100 bg-white py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} SIMAS Masjid
      </footer>
    </div>
  )
}
