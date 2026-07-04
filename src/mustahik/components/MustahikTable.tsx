
import type { Mustahik } from '../types/mustahikTypes'
import { maskNik } from '@/lib/mask'
import MustahikStatusBadge from './MustahikStatusBadge'

interface Props {
  data: Mustahik[]
}

export default function MustahikTable({
  data,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="p-4">Nama</th>
            <th className="p-4">Kategori</th>
            <th className="p-4">Alamat</th>
            <th className="p-4">Total Bantuan</th>
            <th className="p-4">Distribusi Terakhir</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t"
            >
              <td className="p-4">
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {maskNik(item.nik)}
                  </p>
                </div>
              </td>

              <td className="p-4">
                <MustahikStatusBadge
                  category={item.category}
                />
              </td>

              <td className="p-4">
                {item.address}
              </td>

              <td className="p-4">
                Rp{' '}
                {item.totalReceived.toLocaleString(
                  'id-ID'
                )}
              </td>

              <td className="p-4">
                {item.lastDistribution}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
