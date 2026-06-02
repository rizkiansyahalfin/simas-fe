import { SlidersHorizontal } from 'lucide-react'

import type { PaymentStatus } from '../paymentsTypes'

interface PaymentFilterBarProps {
  value: PaymentStatus | 'all'
  onChange: (
    value: PaymentStatus | 'all',
  ) => void
}

export default function PaymentFilterBar({
  value,
  onChange,
}: PaymentFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600">
            <SlidersHorizontal
              className="h-4 w-4"
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Daftar Transaksi
            </h2>

            <p className="text-sm text-slate-500">
              Filter data berdasarkan status pembayaran.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-72">
        <label
          htmlFor="payment-status-filter"
          className="text-sm font-medium text-slate-700"
        >
          Status transaksi
        </label>

        <select
          id="payment-status-filter"
          value={value}
          aria-label="Filter status transaksi"
          onChange={(e) =>
            onChange(
              e.target.value as
                | PaymentStatus
                | 'all',
            )
          }
          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="all">
            Semua Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="settlement">
            Settlement
          </option>

          <option value="capture">
            Capture
          </option>

          <option value="expire">
            Expire
          </option>

          <option value="cancel">
            Cancel
          </option>

          <option value="refund">
            Refund
          </option>
        </select>
      </div>
    </div>
  )
}
