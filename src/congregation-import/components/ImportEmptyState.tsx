import { FileSpreadsheet } from 'lucide-react'

export default function ImportEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20">
      <FileSpreadsheet className="mb-4 h-14 w-14 text-gray-400" />

      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        Belum Ada File
      </h3>

      <p className="max-w-md text-center text-sm text-gray-500">
        Upload file Excel untuk melihat preview data
        jamaah sebelum proses import dilakukan.
      </p>
    </div>
  )
}