import EventHero
from '../components/EventHero'

import EventInfoCard
from '../components/EventInfoCard'

import SpeakerCard
from '../components/SpeakerCard'

import EventGallery
from '../components/EventGallery'

import SaveCalendarButton
from '../components/SaveCalendarButton'
import EventSchedule
from '../components/EventSchedule'
import EventSkeleton
from '../components/EventSkeleton'
import EventEmptyState
from '../components/EventEmptyState'

import {
  useEventDetail,
} from '../hooks/useEventDetail'

export default function EventDetailPage() {

  const {
    event,
    isLoading,
  } = useEventDetail()

  if (isLoading) {
    return <EventSkeleton />
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <EventEmptyState />
        </div>
      </main>
    )
  }

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
      "
    >

      <div
        className="
          mx-auto max-w-7xl
          space-y-10
          px-4 py-8 sm:py-10
        "
      >

        <EventHero event={event} />

        <div
          className="
            grid gap-8
            lg:grid-cols-3
          "
        >

          <div
            className="
              space-y-8
              lg:col-span-2
            "
          >

            <div
              className="
                rounded-2xl border border-slate-200
                bg-white p-5 shadow-none
                sm:p-6
              "
            >

              <h2
                className="
                  text-2xl font-bold text-slate-900
                "
              >
                Tentang Kegiatan
              </h2>

              <p
                className="
                  mt-4 leading-7
                  text-slate-600
                "
              >
                {event.description}
              </p>

            </div>

            <div className="space-y-4">

              <h2
                className="
                  text-2xl font-bold text-slate-900
                "
              >
                Narasumber
              </h2>

              {event.speakers.map(
                (speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                  />
                )
              )}

            </div>

            <div className="space-y-4">

              <h2
                className="
                  text-2xl font-bold text-slate-900
                "
              >
                Galeri Kegiatan
              </h2>

              <EventGallery
                photos={event.gallery}
              />

            </div>

          </div>

          <div className="space-y-6">

            <EventSchedule
              startDate={event.startDate}
              endDate={event.endDate}
            />

            <EventInfoCard
              location={event.location}
              startDate={event.startDate}
            />

            <SaveCalendarButton
              event={event}
            />

          </div>

        </div>

      </div>

    </main>
  )
}
