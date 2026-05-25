// src/features/events/components/SaveCalendarButton.tsx

import { CalendarPlus }
from 'lucide-react'

import { Button }
from '@/components/ui/button'



import {
  generateICS,
} from '../utils/generateICS'
import type { EventDetail } from '../eventTypes'

interface Props {
  event: EventDetail
}

export default function SaveCalendarButton({
  event,
}: Props) {
  return (
    <Button
      onClick={() =>
        generateICS(event)
      }
      className="
        h-11 w-full rounded-xl
        bg-[#059669] text-sm font-bold text-white
        transition-colors
        hover:bg-emerald-700 active:bg-emerald-800
      "
    >
      <CalendarPlus
        className="
          mr-2 h-4 w-4
        "
      />

      Simpan ke Kalender
    </Button>
  )
}
