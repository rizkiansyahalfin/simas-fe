import type { ImportSummary } from '../types/congregationImport'

interface ImportSummaryCardProps {
  summary: ImportSummary
}

export default function ImportSummaryCard({
  summary,
}: ImportSummaryCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">
          Total Data
        </p>

        <p className="mt-2 text-3xl font-bold">
          {summary.total}
        </p>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm text-emerald-700">
          Data Valid
        </p>

        <p className="mt-2 text-3xl font-bold text-emerald-700">
          {summary.valid}
        </p>
      </div>

      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-red-700">
          Data Error
        </p>

        <p className="mt-2 text-3xl font-bold text-red-700">
          {summary.invalid}
        </p>
      </div>
    </div>
  )
}