// src/features/congregation-attendance/components/AttendanceSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton';

export function AttendanceSkeleton() {
  return (
    <div className="space-y-6">
      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              p-5
            "
          >
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-4 h-8 w-20" />

            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>

      <div
        className="
          rounded-lg
          border
          border-slate-200
          bg-white
          p-6
        "
      >
        <Skeleton className="h-5 w-40" />

        <Skeleton className="mt-6 h-4 w-full" />

        <Skeleton className="mt-3 h-4 w-11/12" />
      </div>

      <div
        className="
          rounded-lg
          border
          border-slate-200
          bg-white
          p-6
        "
      >
        <Skeleton className="h-5 w-48" />

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="h-24 w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}