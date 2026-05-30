import type { ImportRow } from '../congregationImport'

interface ImportPreviewTableProps {
  data: ImportRow[]
}

export default function ImportPreviewTable({
  data,
}: ImportPreviewTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="font-semibold">
          Preview Data Jamaah
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm">
                No
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Nama
              </th>

              <th className="px-4 py-3 text-left text-sm">
                NIK
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Alamat
              </th>

              <th className="px-4 py-3 text-left text-sm">
                No HP
              </th>

              <th className="px-4 py-3 text-left text-sm">
                JK
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.row}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {item.row}
                </td>

                <td className="px-4 py-3">
                  {item.nama}
                </td>

                <td className="px-4 py-3">
                  {item.nik}
                </td>

                <td className="px-4 py-3">
                  {item.alamat}
                </td>

                <td className="px-4 py-3">
                  {item.nomorHp}
                </td>

                <td className="px-4 py-3">
                  {item.jenisKelamin}
                </td>

                <td className="px-4 py-3">
                  {item.isValid ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Valid
                    </span>
                  ) : (
                    <span
                      title={item.error}
                      className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                    >
                      Error
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}