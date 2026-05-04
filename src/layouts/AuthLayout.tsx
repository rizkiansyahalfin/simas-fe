import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface AuthLayoutProps {
  children?: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">
      <main className="w-full max-w-md rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="m-0 text-2xl font-semibold tracking-normal text-emerald-700">
            SIMAS Masjid
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Area autentikasi pengguna.
          </p>
        </div>

        {children ?? (
          <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50 p-6 text-center text-sm text-emerald-700">
            Konten form login/register.
          </div>
        )}

        <div className="mt-5 text-center text-sm">
          <Link className="text-emerald-700 hover:underline" to="/">
            Kembali ke halaman public
          </Link>
        </div>
      </main>
    </div>
  )
}
