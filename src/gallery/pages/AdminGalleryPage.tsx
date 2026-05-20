// src/features/gallery/pages/AdminGalleryPage.tsx

import UploadDropzone
from '../components/UploadDropzone'

import GalleryGrid
from '../components/GalleryGrid'

import GalleryEmptyState
from '../components/GalleryEmptyState'

import { useGallery }
from '../hooks/useGallery'

export default function AdminGalleryPage() {

  const {
    photos,
  } = useGallery()

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 p-6
      "
    >
      <div
        className="
          mx-auto max-w-7xl
          space-y-6
        "
      >

        <div>

          <h1
            className="
              text-2xl font-bold
            "
          >
            Manajemen Galeri
          </h1>

          <p
            className="
              mt-1 text-sm
              text-muted-foreground
            "
          >
            Kelola dokumentasi
            kegiatan masjid
          </p>

        </div>

        <UploadDropzone />

        {photos.length === 0 ? (
          <GalleryEmptyState />
        ) : (
          <GalleryGrid
            photos={photos}
          />
        )}

      </div>
    </div>
  )
}