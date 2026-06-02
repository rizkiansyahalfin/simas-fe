import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { paymentService } from '../services/paymentService'

interface Props {
  paymentId: string
  onSuccess?: () => void
}

export default function ManualCheckStatusButton({
  paymentId,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  async function handleCheck() {
    try {
      setLoading(true)

      await paymentService.checkStatus(
        paymentId,
      )

      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleCheck}
      aria-label="Cek status pembayaran terbaru"
      className="border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <RefreshCw
        className={`h-4 w-4 ${
          loading
            ? 'animate-spin'
            : ''
        }`}
      />

      Cek Status
    </Button>
  )
}
