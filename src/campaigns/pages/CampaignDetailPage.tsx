// src/features/campaigns/pages/CampaignDetailPage.tsx

import { useParams }
from 'react-router-dom'

import DonationForm
from '../components/DonationForm'

import CampaignProgress
from '../components/CampaignProgress'

import { useCampaigns }
from '../hooks/useCampaigns'

export default function CampaignDetailPage() {

  const { id } =
    useParams()

  const {
    campaigns,
  } = useCampaigns()

  const campaign =
    campaigns.find(
      (item) =>
        item.id === id
    )

  if (!campaign) {
    return (
      <div>
        Campaign tidak ditemukan
      </div>
    )
  }

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
      "
    >

      <div
        className="
          mx-auto grid
          max-w-7xl gap-8
          px-4 py-10

          lg:grid-cols-3
        "
      >

        <div
          className="
            space-y-6
            lg:col-span-2
          "
        >

          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="
              aspect-video
              w-full rounded-2xl
              object-cover
            "
          />

          <div
            className="
              rounded-2xl border
              bg-white p-6
            "
          >

            <h1
              className="
                text-3xl font-bold
              "
            >
              {campaign.title}
            </h1>

            <p
              className="
                mt-4 leading-7
                text-muted-foreground
              "
            >
              {campaign.description}
            </p>

            <div className="mt-6">
              <CampaignProgress
                collected={
                  campaign.collectedAmount
                }
                target={
                  campaign.targetAmount
                }
              />
            </div>

          </div>

        </div>

        <div>
          <DonationForm />
        </div>

      </div>

    </div>
  )
}