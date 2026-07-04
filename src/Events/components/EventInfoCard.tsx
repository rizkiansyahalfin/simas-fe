import { Calendar, ExternalLink, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  location: string
  startDate: string
}

export default function EventInfoCard({
  location,
  startDate,
}: Props) {

  return (
    <Card
      className="
        rounded-2xl border border-slate-200
        bg-white py-0 shadow-none
      "
    >
      <CardHeader className="border-b border-slate-100 px-5 py-5">
        <CardTitle className="text-base font-bold text-slate-900">
          Informasi Lokasi
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
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Tempat
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {location}
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
            <Calendar className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Tanggal Mulai
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {new Date(startDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex h-10 w-full items-center justify-center gap-2
            rounded-xl border border-emerald-200
            bg-white px-4 text-sm font-bold text-[#059669]
            transition-colors
            hover:bg-emerald-50 active:bg-emerald-100
          "
        >
          <ExternalLink className="h-4 w-4" />
          Buka Maps
        </a>

      </CardContent>
    </Card>
  )
}
