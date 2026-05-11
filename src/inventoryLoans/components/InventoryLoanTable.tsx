// InventoryLoanTable.tsx

import type { InventoryLoan } from '../typesInventoryLoans'
import LoanStatusBadge from './LoanStatusBadge'



interface Props {
  data: InventoryLoan[]
}

export default function InventoryLoanTable({
  data,
}: Props) {
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value))

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-emerald-800">
          Daftar Peminjaman
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {data.length} transaksi peminjaman tercatat.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">

        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <th className="px-5 py-3">Barang</th>
            <th className="px-5 py-3">Peminjam</th>
            <th className="px-5 py-3">Tanggal Pinjam</th>
            <th className="px-5 py-3">Estimasi Kembali</th>
            <th className="px-5 py-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {data.map((loan) => (
            <tr
              key={loan.id}
              className="transition-colors hover:bg-emerald-50/40"
            >
              <td className="px-5 py-4">
                <div className="font-semibold text-slate-900">
                  {loan.itemName}
                </div>
                {loan.notes && (
                  <div className="mt-1 max-w-[240px] truncate text-xs text-slate-500">
                    {loan.notes}
                  </div>
                )}
              </td>

              <td className="px-5 py-4">
                <div className="font-medium text-slate-800">
                  {loan.borrowerName}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {loan.phone}
                </div>
              </td>

              <td className="px-5 py-4 text-slate-600">
                {formatDate(loan.loanDate)}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {formatDate(loan.estimatedReturnDate)}
              </td>

              <td className="px-5 py-4 text-center">
                <LoanStatusBadge
                  status={loan.status}
                />
              </td>
            </tr>
          ))}
        </tbody>

        </table>
      </div>

      {data.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-slate-500">
          Belum ada peminjaman inventaris.
        </div>
      )}
    </div>
  )
}
