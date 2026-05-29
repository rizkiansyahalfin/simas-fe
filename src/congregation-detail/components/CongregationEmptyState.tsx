// src/features/congregation-detail/components/CongregationEmptyState.tsx

import { SearchX, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CongregationEmptyState() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-lg border border-dashed border-gray-300 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50">
          <Users className="size-8 text-emerald-700" aria-hidden="true" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Data jamaah tidak ditemukan
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          Periksa kembali daftar jamaah atau tambahkan data jamaah baru agar
          riwayat administrasi dapat dikelola.
        </p>

        <Button
          type="button"
          className="mt-6 w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
        >
          <SearchX className="size-4" aria-hidden="true" />
          Kembali ke Daftar Jamaah
        </Button>
      </div>
    </section>
  )
}
