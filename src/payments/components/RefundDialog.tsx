import { useState } from 'react'
import {
  Loader2,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'

import { paymentService } from '../services/paymentService'

interface Props {
  paymentId: string
  onSuccess?: () => void
}

export default function RefundDialog({
  paymentId,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  async function handleRefund() {
    try {
      setLoading(true)

      await paymentService.refund(
        paymentId,
      )

      onSuccess?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          aria-label="Refund transaksi"
          className="border-red-200 bg-red-50 text-red-700 shadow-sm hover:bg-red-100 active:bg-red-200 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-4 w-4" />
          Refund
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border border-slate-200 bg-white shadow-xl">
        <AlertDialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-700 ring-1 ring-red-100">
            <TriangleAlert
              className="h-5 w-5"
              aria-hidden="true"
            />
          </div>

          <AlertDialogTitle className="text-xl font-semibold text-slate-950">
            Refund Transaksi
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-slate-600">
            Apakah Anda yakin ingin
            melakukan refund transaksi
            ini? Aksi ini akan meneruskan
            permintaan refund ke Midtrans.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleRefund}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {loading ? 'Memproses' : 'Refund'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
