// src/features/gallery/components/GalleryCard.tsx

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button }
from '@/components/ui/button'
import type { GalleryPhoto } from '../galleryTypes'



interface Props {
  photo: GalleryPhoto

  onDelete: () => void

  onEdit: () => void
}

export default function GalleryCard({
  photo,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-lg border
        bg-white
      "
    >
      <img
        src={photo.imageUrl}
        alt={photo.caption}
        className="
          aspect-square
          w-full object-cover
        "
      />

      <div className="p-4">

        <p
          className="
            line-clamp-2
            text-sm font-medium
          "
        >
          {photo.caption}
        </p>

        <div
          className="
            mt-4 flex gap-2
          "
        >
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}