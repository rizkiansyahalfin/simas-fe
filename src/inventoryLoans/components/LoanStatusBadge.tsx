// src/features/inventory-loans/components/LoanStatusBadge.tsx

import type { LoanStatus } from "../types/typesInventoryLoans"



interface Props {
  status: LoanStatus
}

export default function LoanStatusBadge({
  status,
}: Props) {
  const styles = {
    ACTIVE:
      'bg-emerald-50 text-emerald-700 ring-emerald-100',

    RETURNED:
      'bg-slate-100 text-slate-600 ring-slate-200',

    OVERDUE:
      'bg-rose-50 text-rose-700 ring-rose-100',
  }

  const labels = {
    ACTIVE: 'Aktif',
    RETURNED: 'Dikembalikan',
    OVERDUE: 'Terlambat',
  }

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-3 py-1.5
        text-xs font-semibold
        ring-1 ring-inset
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  )
}
