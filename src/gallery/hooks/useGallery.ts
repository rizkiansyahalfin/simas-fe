// src/features/gallery/hooks/useGallery.ts

import { useState }
from 'react'
import type { GalleryPhoto } from '../types/galleryTypes'



const initialData: GalleryPhoto[] = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',

    caption:
      'Kajian Subuh Ahad',

    createdAt:
      '2026-05-20',
  },

  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206',

    caption:
      'Kegiatan Bakti Sosial',

    createdAt:
      '2026-05-18',
  },
]

export function useGallery() {
  const [photos, setPhotos] =
    useState(initialData)

  const deletePhoto = (
    id: string
  ) => {
    setPhotos((prev) =>
      prev.filter(
        (photo) =>
          photo.id !== id
      )
    )
  }

  const updateCaption = (
    id: string,
    caption: string
  ) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id
          ? {
              ...photo,
              caption,
            }
          : photo
      )
    )
  }

  return {
    photos,
    setPhotos,
    deletePhoto,
    updateCaption,
  }
}