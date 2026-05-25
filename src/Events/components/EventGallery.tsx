import { ImagePlus } from 'lucide-react'
import type { EventPhoto } from '../eventTypes'

interface Props {
  photos: EventPhoto[]
}

export default function EventGallery({
  photos,
}: Props) {
  if (photos.length === 0) {
    return (
      <div
        className="
          flex min-h-56 flex-col items-center justify-center
          rounded-2xl border border-dashed border-slate-200
          bg-white px-6 py-10 text-center
        "
      >
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-emerald-50 text-[#059669]
          "
        >
          <ImagePlus className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          Galeri belum tersedia
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Dokumentasi kegiatan akan ditampilkan setelah foto ditambahkan.
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        grid gap-4
        md:grid-cols-2
      "
    >
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.imageUrl}
          alt=""
          className="
            aspect-video
            rounded-2xl
            border border-slate-200 object-cover
          "
        />
      ))}
    </div>
  )
}
