import { Input } from '@/components/ui/input'

export default function MustahikFilterBar() {
  return (
    <div className="bg-white border rounded-2xl p-4 flex flex-col md:flex-row gap-4">
      <Input placeholder="Cari nama / NIK..." />

      <select className="border rounded-lg px-4">
        <option>Semua Kategori</option>
        <option>Fakir</option>
        <option>Miskin</option>
        <option>Fisabilillah</option>
      </select>
    </div>
  )
}