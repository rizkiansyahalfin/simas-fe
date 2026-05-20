// src/features/gallery/components/UploadDropzone.tsx

import { Upload }
from 'lucide-react'

export default function UploadDropzone() {
  return (
    <label
      className="
        flex cursor-pointer
        flex-col items-center
        justify-center
        rounded-xl border-2
        border-dashed
        border-emerald-200
        bg-emerald-50/40
        px-6 py-14
        text-center
        transition-colors

        hover:border-emerald-500
        hover:bg-emerald-50
      "
    >
      <Upload
        className="
          h-10 w-10
          text-emerald-600
        "
      />

      <h3
        className="
          mt-4 text-lg
          font-semibold
        "
      >
        Upload Foto Galeri
      </h3>

      <p
        className="
          mt-2 text-sm
          text-muted-foreground
        "
      >
        Drag & drop foto atau klik
        untuk upload
      </p>

      <input
        type="file"
        multiple
        className="hidden"
      />
    </label>
  )
}