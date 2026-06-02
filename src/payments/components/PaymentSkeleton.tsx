export default function PaymentSkeleton() {
  const rows = Array.from({
    length: 6,
  })

  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      aria-label="Memuat data transaksi"
      aria-busy="true"
    >
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-slate-100" />
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-4 rounded-lg bg-slate-50 p-3">
          {Array.from({ length: 7 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-slate-200"
              />
            ),
          )}
        </div>

        {rows.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 rounded-lg border border-slate-100 p-3"
          >
            {Array.from({ length: 7 }).map(
              (_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="h-4 animate-pulse rounded bg-slate-100"
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
