import { Skeleton } from '@/components/ui/skeleton'

export default function EventSkeleton() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
      "
    >

      <div
        className="
          mx-auto max-w-7xl
          space-y-8
          px-4 py-10
        "
      >

        {/* HERO */}
          <Skeleton className="h-[28rem] rounded-2xl bg-slate-200" />

        <div
          className="
            grid gap-8
            lg:grid-cols-3
          "
        >

          {/* LEFT */}
          <div
            className="
              space-y-8
              lg:col-span-2
            "
          >

              <div
                className="
                rounded-2xl border border-slate-200
                bg-white p-6
              "
            >

              <Skeleton className="h-7 w-48 bg-slate-200" />

              <div className="mt-6 space-y-3">

                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-2/3 bg-slate-100" />

              </div>

            </div>

            {/* SPEAKER */}
            <div className="space-y-4">

              <Skeleton className="h-7 w-40 bg-slate-200" />

              <div
                className="
                  flex items-center gap-4

                  rounded-2xl border border-slate-200
                  bg-white p-4
                "
              >

                <Skeleton className="h-16 w-16 rounded-full bg-slate-200" />

                <div className="space-y-2">

                  <Skeleton className="h-4 w-32 bg-slate-200" />
                  <Skeleton className="h-3 w-24 bg-slate-100" />

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div
              className="
                rounded-2xl border border-slate-200
                bg-white p-6
              "
            >

              <div className="space-y-4">

                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-2/3 bg-slate-100" />

              </div>

            </div>

            <Skeleton className="h-11 w-full rounded-xl bg-slate-200" />

          </div>

        </div>

      </div>

    </div>
  )
}
