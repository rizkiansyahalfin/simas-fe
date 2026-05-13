export default function MustahikStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border p-5">
        <p className="text-sm text-muted-foreground">
          Total Mustahik
        </p>

        <h2 className="text-3xl font-bold mt-2">
          156
        </h2>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        <p className="text-sm text-muted-foreground">
          Distribusi Bulan Ini
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Rp 12.500.000
        </h2>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        <p className="text-sm text-muted-foreground">
          Kategori Terbanyak
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Miskin
        </h2>
      </div>
    </div>
  )
}