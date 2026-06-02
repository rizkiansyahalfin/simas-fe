import {
  CalendarDays,
  CreditCard,
  MoreHorizontal,
  ReceiptText,
  UserRound,
} from 'lucide-react'

import type { Payment } from '../paymentsTypes'
import ManualCheckStatusButton from './ManualCheckStatusButton'
import PaymentStatusBadge from './PaymentStatusBadge'
import RefundDialog from './RefundDialog'

interface Props {
  data: Payment[]
  onRefresh?: () => void
}

export default function PaymentTable({
  data,
  onRefresh,
}: Props) {
  function formatCurrency(
    amount: number,
  ) {
    return new Intl.NumberFormat(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
      },
    ).format(amount)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-950">
            Riwayat Pembayaran
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Pantau status pembayaran dan lakukan tindakan
            operasional.
          </p>
        </div>

        <div className="text-sm font-medium text-slate-500">
          {data.length.toLocaleString('id-ID')} transaksi
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px]">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Order ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Donatur
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nominal
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Metode
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tanggal
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((payment) => (
              <tr
                key={payment.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-500">
                      <ReceiptText
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="font-mono text-sm font-medium text-slate-900">
                      {payment.orderId}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <UserRound
                      className="h-4 w-4 text-slate-400"
                      aria-hidden="true"
                    />
                    {payment.donorName}
                  </div>
                </td>

                <td className="px-4 py-4 align-middle text-sm font-semibold text-emerald-700">
                  {formatCurrency(payment.amount)}
                </td>

                <td className="px-4 py-4 align-middle">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm font-medium text-slate-700">
                    <CreditCard
                      className="h-3.5 w-3.5 text-slate-400"
                      aria-hidden="true"
                    />
                    {payment.paymentMethod}
                  </div>
                </td>

                <td className="px-4 py-4 align-middle">
                  <PaymentStatusBadge
                    status={payment.status}
                  />
                </td>

                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays
                      className="h-4 w-4 text-slate-400"
                      aria-hidden="true"
                    />
                    {payment.transactionTime}
                  </div>
                </td>

                <td className="px-4 py-4 align-middle">
                  <div className="flex flex-wrap items-center gap-2">
                    <ManualCheckStatusButton
                      paymentId={payment.id}
                      onSuccess={onRefresh}
                    />

                    {(payment.status ===
                      'settlement' ||
                      payment.status ===
                        'capture') && (
                      <RefundDialog
                        paymentId={payment.id}
                        onSuccess={onRefresh}
                      />
                    )}

                    <MoreHorizontal
                      className="h-4 w-4 text-slate-300"
                      aria-hidden="true"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
