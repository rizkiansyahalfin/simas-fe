import type { ImportResult } from '../types/congregationImport'

interface ImportResultTableProps {
  results: ImportResult[]
}

export default function ImportResultTable({
  results,
}: ImportResultTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="font-semibold">
          Hasil Import
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm">
                Row
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Nama
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Status
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Pesan
              </th>
            </tr>
          </thead>

          <tbody>
            {results.map((item) => (
              <tr
                key={`${item.row}-${item.nama}`}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {item.row}
                </td>

                <td className="px-4 py-3">
                  {item.nama}
                </td>

                <td className="px-4 py-3">
                  {item.status ===
                  'success' ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Berhasil
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Gagal
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {item.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}