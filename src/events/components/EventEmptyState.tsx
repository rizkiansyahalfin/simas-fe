import { CalendarX2 } from 'lucide-react'

export default function EventEmptyState() {
  return (
    <div
      className="
        flex flex-col
        items-center
        justify-center

        rounded-2xl border border-dashed border-slate-200

        bg-white

        px-6 py-16
        text-center
      "
    >

      <div
        className="
          flex h-16 w-16
          items-center justify-center

          rounded-full
          bg-emerald-50
        "
      >

        <CalendarX2
          className="
            h-8 w-8
            text-[#059669]
          "
        />

      </div>

      <h3
        className="
          mt-6
          text-2xl font-bold text-slate-900
        "
      >
        Kegiatan Tidak Ditemukan
      </h3>

      <p
        className="
          mt-2 max-w-md
          text-sm
          text-slate-500
        "
      >
        Data kegiatan yang kamu cari
        belum tersedia atau sudah dihapus.
      </p>

    </div>
  )
}
