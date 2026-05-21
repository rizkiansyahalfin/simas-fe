// src/features/campaigns/components/CampaignCard.tsx

import { Link }
from 'react-router-dom'

import CampaignProgress
from './CampaignProgress'

import CampaignCountdown
from './CampaignCountdown'

import DonorCountBadge
from './DonorCountBadge'
import type { Campaign } from '../campaignsTypes'



interface Props {
  campaign: Campaign
}

export default function CampaignCard({
  campaign,
}: Props) {
  return (
    <Link
      to={`/campaigns/${campaign.id}`}
      className="
        overflow-hidden
        rounded-2xl
        border bg-white
        transition-all

        hover:border-emerald-500
      "
    >
      <img
        src={campaign.imageUrl}
        alt={campaign.title}
        className="
          aspect-video
          w-full object-cover
        "
      />

      <div className="space-y-4 p-5">

        <div>

          <h3
            className="
              text-lg font-bold
            "
          >
            {campaign.title}
          </h3>

          <p
            className="
              mt-2 line-clamp-2
              text-sm
              text-muted-foreground
            "
          >
            {campaign.description}
          </p>

        </div>

        <CampaignProgress
          collected={
            campaign.collectedAmount
          }
          target={
            campaign.targetAmount
          }
        />

        <div
          className="
            flex items-center
            justify-between
          "
        >
          <DonorCountBadge
            total={
              campaign.donorCount
            }
          />

          <CampaignCountdown
            deadline={
              campaign.deadline
            }
          />
        </div>

      </div>
    </Link>
  )
}