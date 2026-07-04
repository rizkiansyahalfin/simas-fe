// src/features/events/utils/generateICS.ts

import type { EventDetail } from "../types/eventTypes"


export function generateICS(
  event: EventDetail
) {

  const content = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${event.startDate.replace(/[-:]/g, '')}
DTEND:${event.endDate.replace(/[-:]/g, '')}
END:VEVENT
END:VCALENDAR
`

  const blob =
    new Blob(
      [content],
      {
        type:
          'text/calendar;charset=utf-8',
      }
    )

  const url =
    URL.createObjectURL(blob)

  const link =
    document.createElement('a')

  link.href = url

  link.download =
    `${event.title}.ics`

  link.click()

  URL.revokeObjectURL(url)
}