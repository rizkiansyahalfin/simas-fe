import ImportCongregationDialog from '../components/ImportCongregationDialog'

export default function CongregationImportPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Import Data Jamaah
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Upload file Excel untuk menambahkan data jamaah
            secara massal.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <ImportCongregationDialog />
        </div>
      </div>
    </div>
  )
}