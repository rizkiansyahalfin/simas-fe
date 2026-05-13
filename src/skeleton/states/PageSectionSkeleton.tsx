import { Skeleton } from '@/components/ui/skeleton'

interface PageSectionSkeletonProps {
  rows?: number
  showHeader?: boolean
}

export default function PageSectionSkeleton({
  rows = 4,
  showHeader = true,
}: PageSectionSkeletonProps) {
  return (
    <section className="space-y-4">
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-7 w-56 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-md rounded-lg" />
        </div>
      )}

      <div className="rounded-lg border bg-white p-5">
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-12 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
