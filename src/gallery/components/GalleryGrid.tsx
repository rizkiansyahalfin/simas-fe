// src/features/gallery/components/GalleryGrid.tsx

import type { GalleryPhoto } from '../galleryTypes'
import GalleryCard
from './GalleryCard'


interface Props {
  photos: GalleryPhoto[]
}

export default function GalleryGrid({
  photos,
}: Props) {
  return (
    <div
      className="
        grid gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {photos.map((photo) => (
        <GalleryCard
          key={photo.id}
          photo={photo}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      ))}
    </div>
  )
}