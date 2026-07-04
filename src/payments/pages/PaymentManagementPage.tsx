import {
  Activity,
  CreditCard,
  RefreshCw,
  RotateCcw,
  TrendingUp,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import PaymentEmptyState from '../components/PaymentEmptyState'
import PaymentFilterBar from '../components/PaymentFilterBar'
import PaymentSkeleton from '../components/PaymentSkeleton'
import PaymentTable from '../components/PaymentTable'

import { usePayments } from '../hooks/usePayments'

export default function PaymentManagementPage() {
  const {
    payments,
    loading,

    statusFilter,
    setStatusFilter,

    refresh,
  } = usePayments()

  const settledCount = payments.filter(
    (payment) =>
      payment.status === 'settlement' ||
      payment.status === 'capture',
  ).length

  const pendingCount = payments.filter(
    (payment) =>
      payment.status === 'pending',
  ).length

  const refundCount = payments.filter(
    (payment) => payment.status === 'refund',
  ).length

  const totalAmount = payments.reduce(
    (total, payment) =>
      payment.status === 'settlement' ||
      payment.status === 'capture'
        ? total + payment.amount
        : total,
    0,
  )

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount)

  const stats = [
    {
      label: 'Total Transaksi',
      value: payments.length.toLocaleString(
        'id-ID',
      ),
      trend: 'Semua status pembayaran',
      icon: CreditCard,
    },
    {
      label: 'Dana Berhasil',
      value: formatCurrency(totalAmount),
      trend: `${settledCount.toLocaleString(
        'id-ID',
      )} transaksi sukses`,
      icon: TrendingUp,
    },
    {
      label: 'Menunggu',
      value: pendingCount.toLocaleString(
        'id-ID',
      ),
      trend: 'Perlu pemantauan status',
      icon: Activity,
    },
    {
      label: 'Refund',
      value: refundCount.toLocaleString(
        'id-ID',
      ),
      trend: 'Transaksi dikembalikan',
      icon: RotateCcw,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-amber-700">
              Payments
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Manajemen Transaksi
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Kelola seluruh transaksi Midtrans,
              cek status pembayaran, dan proses refund
              dalam satu dashboard operasional.
            </p>
          </div>

          <Button
            type="button"
            onClick={refresh}
            disabled={loading}
            aria-label="Muat ulang data transaksi"
            className="h-10 w-full rounded-lg bg-emerald-600 px-4 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:w-auto"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? 'animate-spin' : ''
              }`}
            />
            Refresh Data
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="text-2xl font-semibold tracking-tight text-slate-950">
                      {stat.value}
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-2 text-emerald-700">
                    <Icon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  {stat.trend}
                </p>
              </div>
            )
          })}
        </div>

        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <PaymentFilterBar
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {loading && <PaymentSkeleton />}

        {!loading &&
          payments.length === 0 && (
            <PaymentEmptyState
              onRefresh={refresh}
            />
          )}

        {!loading &&
          payments.length > 0 && (
            <PaymentTable
              data={payments}
              onRefresh={refresh}
            />
          )}
      </div>
    </div>
  )
}
