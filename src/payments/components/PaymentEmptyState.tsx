import {
  RefreshCw,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  onRefresh?: () => void
}

export default function PaymentEmptyState({
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-700">
        <Wallet
          className="h-8 w-8"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold text-slate-950">
        Belum Ada Transaksi
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Data transaksi Midtrans akan
        muncul setelah pembayaran pertama dibuat
        atau status transaksi berhasil tersinkron.
      </p>

      {onRefresh && (
        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          aria-label="Coba muat ulang transaksi"
          className="mt-6 h-10 border-slate-300 bg-white px-4 text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" />
          Muat Ulang
        </Button>
      )}
    </div>
  )
}
