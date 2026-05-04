import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Landmark, LockKeyhole, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthLayoutProps {
  children?: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen place-items-center bg-emerald-950 px-5 py-10 text-slate-950">
      <div className="w-full max-w-md rounded-lg border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/20">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Landmark className="size-6" />
          </div>
          <h1 className="m-0 text-2xl font-semibold tracking-normal text-slate-950">
            Masuk SIMAS
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Akses panel pengelolaan informasi masjid.
          </p>
        </div>

        {children ?? (
          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="h-10 pl-9"
                  placeholder="admin@simas.test"
                  type="email"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="h-10 pl-9"
                  placeholder="Masukkan password"
                  type="password"
                />
              </div>
            </label>

            <Button
              className="h-10 w-full bg-emerald-600 text-white hover:bg-emerald-700"
              type="button"
            >
              Masuk
            </Button>
          </form>
        )}

        <div className="mt-5 text-center text-sm text-slate-500">
          <Link className="font-medium text-emerald-700 hover:text-emerald-800" to="/">
            Kembali ke halaman publik
          </Link>
        </div>
      </div>
    </div>
  )
}
