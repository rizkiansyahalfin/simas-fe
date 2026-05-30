// src/features/events/hooks/useEventDetail.ts

import { useMemo }
from 'react'
import type { EventDetail } from '../types/eventTypes'



export function useEventDetail() {

  const event: EventDetail =
    useMemo(() => ({
      id: '1',

      title:
        'Kajian Akbar Ramadhan',

      type:
        'Kajian Akbar',

      status:
        'upcoming',

      description:
        'Kajian spesial Ramadhan bersama ustadz nasional membahas tema memperkuat ukhuwah islamiyah.',

      banner:
        'https://images.unsplash.com/photo-1519817650390-64a93db51149',

      location:
        'Masjid Raya Al-Hikmah',

      startDate:
        '2026-06-12T19:00:00',

      endDate:
        '2026-06-12T21:00:00',

      speakers: [
        {
          id: '1',
          name:
            'Ustadz Ahmad Fauzi',
          role:
            'Narasumber Utama',
          photo:
            'https://i.pravatar.cc/300',
        },
      ],

      gallery: [
        {
          id: '1',
          imageUrl:
            'https://images.unsplash.com/photo-1509099836639-18ba1795216d',
        },

        {
          id: '2',
          imageUrl:
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
        },
      ],
    }), [])

  return {
    event,
    isLoading: false,
  }
}
