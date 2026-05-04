import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  Banknote,
  CalendarDays,
  Home,
  Landmark,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children?: ReactNode
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Data Masjid", icon: Landmark },
  { label: "Agenda", icon: CalendarDays },
  { label: "Jamaah", icon: Users },
  { label: "Keuangan", icon: Banknote },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
          <Link to="/" className="mb-8 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Landmark className="size-5" />
            </span>
            <span>
              <span className="block font-semibold leading-tight">
                SIMAS Admin
              </span>
              <span className="block text-xs text-slate-500">
                Panel Pengurus
              </span>
            </span>
          </Link>

          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon

              return (
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    index === 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                  key={item.label}
                  type="button"
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <Button className="lg:hidden" size="icon" variant="outline">
                <Menu className="size-4" />
              </Button>
              <div>
                <h1 className="m-0 text-lg font-semibold tracking-normal text-slate-950">
                  Dashboard Admin
                </h1>
                <p className="text-sm text-slate-500">
                  Ringkasan operasional SIMAS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="size-4" />
                  Public
                </Link>
              </Button>
              <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Link to="/auth">
                  <LogOut className="size-4" />
                  Keluar
                </Link>
              </Button>
            </div>
          </header>

          <main className="flex-1 p-5 lg:p-8">
            {children ?? (
              <section className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Agenda Aktif", "12"],
                    ["Data Jamaah", "248"],
                    ["Saldo Kas", "Rp 18,5 jt"],
                  ].map(([label, value]) => (
                    <div
                      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                      key={label}
                    >
                      <p className="text-sm text-slate-500">{label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="m-0 text-lg font-semibold text-slate-950">
                    Aktivitas Terbaru
                  </h2>
                  <div className="mt-4 divide-y divide-slate-100">
                    {["Kajian subuh ditambahkan", "Laporan kas diperbarui", "Berita Jumat dipublikasi"].map(
                      (activity) => (
                        <div className="py-3 text-sm text-slate-600" key={activity}>
                          {activity}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
