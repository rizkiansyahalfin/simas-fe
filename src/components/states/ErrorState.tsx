// src/components/states/ErrorState.tsx

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  title?: string

  description?: string

  onRetry?: () => void
}

export default function ErrorState({
  title = 'Terjadi Kesalahan',
  description = 'Gagal memuat data.',
  onRetry,
}: Props) {
  return (
    <div
      className="
        rounded-xl border
        bg-white px-6 py-14
        text-center
      "
    >
      <div
        className="
          mx-auto flex h-14 w-14
          items-center justify-center
          rounded-full
          bg-red-50
        "
      >
        <AlertTriangle
          className="
            h-7 w-7
            text-red-600
          "
        />
      </div>

      <h3
        className="
          mt-5 text-lg font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2 text-sm
          text-muted-foreground
        "
      >
        {description}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-6"
        >
          Coba Lagi
        </Button>
      )}
    </div>
  )
}
