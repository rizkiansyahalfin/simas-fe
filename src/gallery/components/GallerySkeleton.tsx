// src/features/gallery/components/GallerySkeleton.tsx

import { Skeleton }
from '@/components/ui/skeleton'

export default function GallerySkeleton() {
  return (
    <div
      className="
        grid gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {Array.from({
        length: 8,
      }).map((_, i) => (
        <div
          key={i}
          className="
            overflow-hidden
            rounded-lg border
            bg-white
          "
        >
          <Skeleton
            className="
              aspect-square w-full
            "
          />

          <div className="p-4">
            <Skeleton
              className="
                h-4 w-3/4
              "
            />
          </div>
        </div>
      ))}
    </div>
  )
}