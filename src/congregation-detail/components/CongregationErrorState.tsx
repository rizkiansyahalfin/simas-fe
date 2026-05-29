// src/features/congregation-detail/components/CongregationErrorState.tsx

import { AlertCircle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
  onRetry?: () => void
}

export default function CongregationErrorState({ onRetry }: Props) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="size-7 text-red-600" aria-hidden="true" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Data jamaah belum dapat dimuat
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          Sistem mengalami kendala saat mengambil detail jamaah. Silakan coba
          lagi dalam beberapa saat.
        </p>

        <Button
          type="button"
          onClick={onRetry}
          className="mt-6 w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Coba Lagi
        </Button>
      </div>
    </section>
  )
}
