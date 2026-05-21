// src/features/campaigns/hooks/useCampaigns.ts

import { useMemo }from 'react'
import type { Campaign } from '../campaignsTypes'



const campaigns: Campaign[] = [
  {
    id: '1',

    title:
      'Renovasi Tempat Wudhu',

    description:
      'Membantu renovasi tempat wudhu masjid agar lebih nyaman.',

    imageUrl:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d',

    collectedAmount:
      15000000,

    targetAmount:
      50000000,

    donorCount:
      128,

    deadline:
      '2026-06-30',
  },

  {
    id: '2',

    title:
      'Santunan Anak Yatim',

    description:
      'Program santunan bulanan untuk anak yatim dan dhuafa.',

    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952',

    collectedAmount:
      8500000,

    targetAmount:
      20000000,

    donorCount:
      74,

    deadline:
      '2026-06-10',
  },
]

export function useCampaigns() {
  return useMemo(() => ({
    campaigns,
  }), [])
}