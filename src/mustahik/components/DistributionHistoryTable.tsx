

import type { DistributionHistory } from '../mustahikTypes'
import DistributionStatusBadge from './DistributionStatusBadge'

interface Props {
  data: DistributionHistory[]
}

export default function DistributionHistoryTable({
  data,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-lg">
          Riwayat Distribusi
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="p-4">Nama</th>
            <th className="p-4">Kategori</th>
            <th className="p-4">Nominal</th>
            <th className="p-4">Tanggal</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t"
            >
              <td className="p-4">
                {item.recipientName}
              </td>

              <td className="p-4">
                {item.category}
              </td>

              <td className="p-4">
                Rp{' '}
                {item.amount.toLocaleString(
                  'id-ID'
                )}
              </td>

              <td className="p-4">
                {item.date}
              </td>

              <td className="p-4">
                <DistributionStatusBadge
                  status={item.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}