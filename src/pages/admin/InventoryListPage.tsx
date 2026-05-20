import { useMemo, useState } from "react"
import Badge from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type AssetCondition = "Baik" | "Perlu Perbaikan" | "Rusak"
type ConditionFilter = "Semua" | AssetCondition

interface InventoryAsset {
  id: number
  name: string
  category: string
  location: string
  quantity: number
  condition: AssetCondition
  lastChecked: string
}

const inventoryAssets: InventoryAsset[] = [
  {
    id: 1,
    name: "Karpet Shalat Saf Depan",
    category: "Perlengkapan Ibadah",
    location: "Ruang Utama",
    quantity: 12,
    condition: "Baik",
    lastChecked: "2026-05-01",
  },
  {
    id: 2,
    name: "Mikrofon Wireless",
    category: "Elektronik",
    location: "Mimbar",
    quantity: 2,
    condition: "Perlu Perbaikan",
    lastChecked: "2026-04-28",
  },
  {
    id: 3,
    name: "Kipas Angin Dinding",
    category: "Fasilitas",
    location: "Serambi",
    quantity: 6,
    condition: "Baik",
    lastChecked: "2026-04-25",
  },
  {
    id: 4,
    name: "Rak Al-Quran Kayu",
    category: "Perlengkapan Ibadah",
    location: "Ruang Utama",
    quantity: 3,
    condition: "Rusak",
    lastChecked: "2026-04-20",
  },
  {
    id: 5,
    name: "Speaker Aktif",
    category: "Elektronik",
    location: "Ruang Audio",
    quantity: 4,
    condition: "Baik",
    lastChecked: "2026-05-03",
  },
]

const conditionOptions: ConditionFilter[] = [
  "Semua",
  "Baik",
  "Perlu Perbaikan",
  "Rusak",
]

const summaryConditions: AssetCondition[] = [
  "Baik",
  "Perlu Perbaikan",
  "Rusak",
]

const conditionBadgeClass: Record<AssetCondition, string> = {
  Baik: "bg-emerald-100 text-emerald-700",
  "Perlu Perbaikan": "bg-amber-100 text-amber-700",
  Rusak: "bg-red-100 text-red-700",
}

export default function InventoryListPage() {
  const [search, setSearch] = useState("")
  const [conditionFilter, setConditionFilter] =
    useState<ConditionFilter>("Semua")

  const filteredAssets = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return inventoryAssets.filter((asset) => {
      const matchesCondition =
        conditionFilter === "Semua" || asset.condition === conditionFilter
      const matchesSearch =
        !normalizedSearch ||
        asset.name.toLowerCase().includes(normalizedSearch) ||
        asset.category.toLowerCase().includes(normalizedSearch) ||
        asset.location.toLowerCase().includes(normalizedSearch)

      return matchesCondition && matchesSearch
    })
  }, [conditionFilter, search])

  const conditionSummary = useMemo(() => {
    return inventoryAssets.reduce(
      (summary, asset) => {
        summary[asset.condition] += 1
        return summary
      },
      { Baik: 0, "Perlu Perbaikan": 0, Rusak: 0 }
    )
  }, [])

  return (
    <section className="space-y-6">
      <div>
        <h2 className="m-0 text-2xl font-semibold tracking-normal text-slate-900">
          Daftar Inventaris
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Pantau aset masjid berdasarkan kategori, lokasi, dan kondisi terbaru.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryConditions.map((condition) => (
          <div
            className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm"
            key={condition}
          >
            <p className="text-sm text-slate-500">Kondisi {condition}</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {conditionSummary[condition]} aset
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-emerald-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-emerald-100 p-5 md:grid-cols-[1fr_220px] md:items-end">
          <div>
            <h3 className="m-0 text-lg font-semibold tracking-normal text-slate-900">
              Tabel Aset
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Gunakan pencarian dan filter untuk menemukan aset.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <Input
              aria-label="Cari aset"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari aset..."
              value={search}
            />
            <select
              aria-label="Filter kondisi"
              className="h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              onChange={(event) =>
                setConditionFilter(event.target.value as ConditionFilter)
              }
              value={conditionFilter}
            >
              {conditionOptions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition === "Semua" ? "Semua Kondisi" : condition}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-emerald-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Aset</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Lokasi</th>
                <th className="px-4 py-3 text-right font-medium">Jumlah</th>
                <th className="px-4 py-3 font-medium">Kondisi</th>
                <th className="px-4 py-3 font-medium">Cek Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {asset.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{asset.category}</td>
                  <td className="px-4 py-3 text-slate-600">{asset.location}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {asset.quantity}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={conditionBadgeClass[asset.condition]}>
                      {asset.condition}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {asset.lastChecked}
                  </td>
                </tr>
              ))}

              {filteredAssets.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-slate-500"
                    colSpan={6}
                  >
                    Tidak ada aset yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
