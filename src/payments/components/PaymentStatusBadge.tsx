import type { PaymentStatus } from '../paymentsTypes'

interface Props {
  status: PaymentStatus
}

export default function PaymentStatusBadge({
  status,
}: Props) {
  const styles: Record<
    PaymentStatus,
    string
  > = {
    settlement:
      'bg-emerald-100 text-emerald-700 ring-emerald-200',

    capture:
      'bg-emerald-100 text-emerald-700 ring-emerald-200',

    pending:
      'bg-blue-100 text-blue-700 ring-blue-200',

    expire:
      'bg-red-100 text-red-700 ring-red-200',

    cancel:
      'bg-red-100 text-red-700 ring-red-200',

    refund:
      'bg-slate-100 text-slate-700 ring-slate-200',
  }

  const labels: Record<
    PaymentStatus,
    string
  > = {
    settlement: 'Settlement',
    capture: 'Capture',
    pending: 'Pending',
    expire: 'Expired',
    cancel: 'Canceled',
    refund: 'Refund',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
