import {
  CalendarDays,
  Clock3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  startDate: string
  endDate: string
}

export default function EventSchedule({
  startDate,
  endDate,
}: Props) {

  const start =
    new Date(startDate)

  const end =
    new Date(endDate)

  return (
    <Card
      className="
        rounded-2xl border border-slate-200
        bg-white py-0 shadow-none
      "
    >
      <CardHeader className="border-b border-slate-100 px-5 py-5">
        <CardTitle className="text-base font-bold text-slate-900">
          Jadwal Kegiatan
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-5">

        <div
          className="
            flex items-start gap-3
          "
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-emerald-50 text-[#059669]
            "
          >
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Hari dan Tanggal
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {start.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

        </div>

        <div
          className="
            flex items-start gap-3
          "
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-amber-50 text-[#B45309]
            "
          >
            <Clock3 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Waktu
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {start.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' - '}
              {end.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              WIB
            </p>
          </div>

        </div>

      </CardContent>

    </Card>
  )
}
