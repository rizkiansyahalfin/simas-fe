// src/components/states/PageSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'

export default function PageSkeleton() {
  return (
    <div className="space-y-6">

      {/* title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />

        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      {/* stats */}
      <div
        className="
          grid gap-4
          md:grid-cols-3
        "
      >
        {Array.from({ length: 3 }).map(
          (_, i) => (
            <div
              key={i}
              className="
                rounded-lg border
                bg-white p-5
              "
            >
              <Skeleton className="h-4 w-24" />

              <Skeleton className="mt-4 h-8 w-32" />
            </div>
          )
        )}
      </div>

      {/* table */}
      <div
        className="
          rounded-lg border
          bg-white p-5
          space-y-4
        "
      >
        {Array.from({ length: 6 }).map(
          (_, i) => (
            <Skeleton
              key={i}
              className="h-12 w-full"
            />
          )
        )}
      </div>

    </div>
  )
}
