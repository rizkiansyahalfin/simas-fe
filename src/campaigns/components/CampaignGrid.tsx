// src/features/campaigns/components/CampaignGrid.tsx

import type { Campaign } from '../types/campaignsTypes'
import CampaignCard
from './CampaignCard'



interface Props {
  campaigns: Campaign[]
}

export default function CampaignGrid({
  campaigns,
}: Props) {
  return (
    <div
      className="
        grid gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
        />
      ))}
    </div>
  )
}