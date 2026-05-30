import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import DataTable, { type ColumnConfig } from "@/components/DataTable"

type AssetCondition = "Baik" | "Perlu Perbaikan" | "Rusak"
type ConditionFilter = "Semua" | AssetCondition

interface InventoryAsset {
  [key: string]: unknown
  id: number
  name: string
  category: string
  location: string
  quantity: number
  condition: AssetCondition
  lastChecked: string
}

const inventoryAssets: InventoryAsset[] = [
  { id: 1, name: "Karpet Shalat Saf Depan", category: "Perlengkapan Ibadah", location: "Ruang Utama", quantity: 12, condition: "Baik", lastChecked: "2026-05-01" },
  { id: 2, name: "Mikrofon Wireless", category: "Elektronik", location: "Mimbar", quantity: 2, condition: "Perlu Perbaikan", lastChecked: "2026-04-28" },
  { id: 3, name: "Kipas Angin Dinding", category: "Fasilitas", location: "Serambi", quantity: 6, condition: "Baik", lastChecked: "2026-04-25" },
  { id: 4, name: "Rak Al-Quran Kayu", category: "Perlengkapan Ibadah", location: "Ruang Utama", quantity: 3, condition: "Rusak", lastChecked: "2026-04-20" },
  { id: 5, name: "Speaker Aktif", category: "Elektronik", location: "Ruang Audio", quantity: 4, condition: "Baik", lastChecked: "2026-05-03" },
]

const conditionOptions: ConditionFilter[] = ["Semua", "Baik", "Perlu Perbaikan", "Rusak"]
const summaryConditions: AssetCondition[] = ["Baik", "Perlu Perbaikan", "Rusak"]

const conditionBadgeClass: Record<AssetCondition, string> = {
  Baik: "bg-emerald-100 text-emerald-700",
  "Perlu Perbaikan": "bg-amber-100 text-amber-700",
  Rusak: "bg-red-100 text-red-700",
}

export default function InventoryListPage() {
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>("Semua")

  // Filter khusus untuk Dropdown Kondisi (Fitur Search teks otomatis diurus oleh DataTable)
  const filteredAssets = useMemo(() => {
    return inventoryAssets.filter((asset) => {
      return conditionFilter === "Semua" || asset.condition === conditionFilter
    })
  }, [conditionFilter])

  const conditionSummary = useMemo(() => {
    return inventoryAssets.reduce(
      (summary, asset) => {
        summary[asset.condition] += 1
        return summary
      },
      { Baik: 0, "Perlu Perbaikan": 0, Rusak: 0 }
    )
  }, [])

  // Konfigurasi Kolom untuk DataTable
  const columns: ColumnConfig<InventoryAsset>[] = [
    { header: "Nama Aset", accessorKey: "name" },
    { header: "Kategori", accessorKey: "category" },
    { header: "Lokasi", accessorKey: "location" },
    { header: "Jumlah", accessorKey: "quantity" },
    {
      header: "Kondisi",
      accessorKey: "condition",
      // Render custom cell buat nampilin Badge estetik
      cell: (item) => (
        <Badge className={conditionBadgeClass[item.condition]}>
          {item.condition}
        </Badge>
      ),
    },
    { header: "Cek Terakhir", accessorKey: "lastChecked" },
  ]

  return (
    <section className="space-y-8 p-4 md:p-8 font-sans">
      
      {/* Header Info */}
      <div>
        <h2 className="m-0 text-3xl font-bold tracking-tight text-slate-900">
          Daftar Inventaris
        </h2>
        <p className="mt-2 text-base text-slate-500">
          Pantau aset masjid berdasarkan kategori, lokasi, dan kondisi terbaru.
        </p>
      </div>

      {/* Kartu Ringkasan Kondisi */}
      <div className="grid gap-4 md:grid-cols-3">
        {summaryConditions.map((condition) => (
          <div
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            key={condition}
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kondisi {condition}</p>
            <p className={`mt-2 text-3xl font-extrabold ${condition === 'Baik' ? 'text-emerald-600' : condition === 'Rusak' ? 'text-red-500' : 'text-amber-500'}`}>
              {conditionSummary[condition]} <span className="text-lg font-medium text-slate-500">aset</span>
            </p>
          </div>
        ))}
      </div>

      {/* Area Filter Tambahan & DataTable */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <select
            aria-label="Filter kondisi"
            className="h-10 min-w-[200px] rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none focus-visible:border-emerald-500 focus-visible:ring-1 focus-visible:ring-emerald-500 shadow-sm cursor-pointer"
            onChange={(event) =>
              setConditionFilter(event.target.value as ConditionFilter)
            }
            value={conditionFilter}
          >
            {conditionOptions.map((condition) => (
              <option key={condition} value={condition}>
                {condition === "Semua" ? "Filter: Semua Kondisi" : `Filter: ${condition}`}
              </option>
            ))}
          </select>
        </div>

        {/* Panggil komponen sakti DataTable */}
        <DataTable
          data={filteredAssets}
          columns={columns}
          title="Tabel Aset"
          exportFilename="Laporan_Inventaris_Masjid"
        />
      </div>
      
    </section>
  )
}