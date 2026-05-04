import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children?: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 bg-emerald-700 p-4 text-white md:block">
          <Link className="mb-6 block font-semibold text-white" to="/">
            SIMAS Admin
          </Link>

          <nav className="space-y-1">
            <Button className="w-full justify-start text-white hover:bg-emerald-600 hover:text-white" variant="ghost">
              Dashboard
            </Button>
            <Button className="w-full justify-start text-white hover:bg-emerald-600 hover:text-white" variant="ghost">
              Data Masjid
            </Button>
            <Button className="w-full justify-start text-white hover:bg-emerald-600 hover:text-white" variant="ghost">
              Agenda
            </Button>
            <Button className="w-full justify-start text-white hover:bg-emerald-600 hover:text-white" variant="ghost">
              Keuangan
            </Button>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-emerald-200 bg-white px-6">
            <h1 className="m-0 text-lg font-semibold tracking-normal">
              Admin Dashboard
            </h1>

            <Button asChild size="sm" variant="outline">
              <Link to="/auth">Logout</Link>
            </Button>
          </header>

          <main className="flex-1 p-6">
            {children ?? (
              <div className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
                <h2 className="m-0 text-xl font-semibold tracking-normal">
                  Admin Layout
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Area konten halaman admin.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
