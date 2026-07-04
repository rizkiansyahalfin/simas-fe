import { CalendarDays, CheckCircle2, Clock3, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { EventDetail } from '../types/eventTypes'

interface Props {
  event: EventDetail
}

const statusClassName: Record<EventDetail['status'], string> = {
  verified: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  pending: 'border-sky-200 bg-sky-50 text-sky-700',
  upcoming: 'border-sky-200 bg-sky-50 text-sky-700',
  rejected: 'border-red-200 bg-red-50 text-red-700',
  inactive: 'border-red-200 bg-red-50 text-red-700',
  draft: 'border-gray-200 bg-gray-100 text-gray-600',
  completed: 'border-gray-200 bg-gray-100 text-gray-600',
}

const statusLabel: Record<EventDetail['status'], string> = {
  verified: 'Verified',
  active: 'Aktif',
  pending: 'Pending',
  upcoming: 'Mendatang',
  rejected: 'Rejected',
  inactive: 'Nonaktif',
  draft: 'Draft',
  completed: 'Selesai',
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function EventHero({
  event,
}: Props) {
  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-emerald-900/10
        bg-emerald-800 text-white
      "
    >
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(135deg,rgba(5,150,105,0.95),rgba(6,95,70,0.82))]
        "
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-15"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="event-geo-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 2 46 24 24 46 2 24Z M24 12 36 24 24 36 12 24Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#event-geo-pattern)" />
      </svg>

      <img
        src={event.banner}
        alt={event.title}
        className="
          absolute inset-0 h-full w-full
          object-cover opacity-25
        "
      />

      <div
        className="
          relative
          flex min-h-[28rem] flex-col justify-end
          px-5 py-8
          sm:px-8
          md:min-h-[30rem] md:px-10 md:py-10
        "
      >
        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge
              className="
                rounded-full border border-amber-200
                bg-amber-50 px-3 py-1
                text-xs font-bold text-[#B45309]
              "
            >
              {event.type}
            </Badge>

            <Badge
              className={`
                rounded-full border px-3 py-1
                text-xs font-bold
                ${statusClassName[event.status]}
              `}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {statusLabel[event.status]}
            </Badge>
          </div>

          <h1
            className="
              max-w-3xl
              text-3xl font-extrabold leading-tight tracking-normal
              sm:text-4xl md:text-5xl
            "
          >
            {event.title}
          </h1>

          <div
            className="
              mt-6 grid gap-3 text-sm text-emerald-50
              sm:grid-cols-2 lg:max-w-3xl
            "
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-amber-200" />
              <span>{formatDate(event.startDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-200" />
              <span>
                {formatTime(event.startDate)} - {formatTime(event.endDate)} WIB
              </span>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="h-4 w-4 text-amber-200" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}
