// src/features/gallery/components/GalleryEmptyState.tsx

import EmptyState from "@/skeleton/states/EmptyState";



export default function GalleryEmptyState() {
  return (
    <EmptyState
      title="Belum Ada Foto"
      description="
      Upload dokumentasi kegiatan
      masjid pertama Anda.
      "
    />
  )
}