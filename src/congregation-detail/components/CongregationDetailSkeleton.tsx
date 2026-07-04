// src/features/congregation-detail/components/CongregationDetailSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton"

export default function CongregationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <Skeleton className="size-16 bg-gray-200" />
              <div className="space-y-3">
                <Skeleton className="h-7 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-72 max-w-full bg-gray-200" />
                <Skeleton className="h-6 w-28 bg-gray-200" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px]">
              <Skeleton className="h-20 bg-gray-200" />
              <Skeleton className="h-20 bg-gray-200" />
              <Skeleton className="h-20 bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="space-y-3 border-b border-gray-200 p-6">
                  <Skeleton className="h-6 w-44 bg-gray-200" />
                  <Skeleton className="h-4 w-64 max-w-full bg-gray-200" />
                </div>
                <div className="space-y-4 p-6">
                  <Skeleton className="h-11 w-full bg-gray-200" />
                  <Skeleton className="h-11 w-full bg-gray-200" />
                  <Skeleton className="h-11 w-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-6 w-40 bg-gray-200" />
            <div className="mt-6 space-y-4">
              <Skeleton className="h-12 w-full bg-gray-200" />
              <Skeleton className="h-12 w-full bg-gray-200" />
              <Skeleton className="h-12 w-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
