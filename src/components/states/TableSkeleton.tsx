// src/components/states/TableSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  rows?: number
}

export default function TableSkeleton({
  rows = 5,
}: Props) {
  return (
    <div
      className="
        rounded-lg border
        bg-white overflow-hidden
      "
    >
      <div className="p-4 border-b">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="space-y-4 p-4">
        {Array.from({
          length: rows,
        }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-12 w-full"
          />
        ))}
      </div>
    </div>
  )
}
