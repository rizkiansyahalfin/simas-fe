// src/features/campaigns/components/CampaignEmptyState.tsx

import { Inbox }
from 'lucide-react'

export default function CampaignEmptyState() {
  return (
    <div
      className="
        flex flex-col
        items-center
        justify-center

        rounded-2xl
        border border-dashed
        bg-white

        px-6 py-16
        text-center
      "
    >

      <div
        className="
          flex h-16 w-16
          items-center justify-center

          rounded-full
          bg-emerald-100
        "
      >
        <Inbox
          className="
            h-8 w-8
            text-emerald-700
          "
        />
      </div>

      <h3
        className="
          mt-6 text-xl
          font-bold
        "
      >
        Belum Ada Campaign
      </h3>

      <p
        className="
          mt-2 max-w-md
          text-sm text-muted-foreground
        "
      >
        Saat ini belum ada campaign
        donasi yang tersedia.
      </p>

    </div>
  )
}