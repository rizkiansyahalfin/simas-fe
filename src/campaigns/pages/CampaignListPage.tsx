// src/features/campaigns/pages/CampaignListPage.tsx

import CampaignGrid
from '../components/CampaignGrid'

import { useCampaigns }
from '../hooks/useCampaigns'

export default function CampaignListPage() {

  const {
    campaigns,
  } = useCampaigns()

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
      "
    >

      <section
        className="
          mx-auto max-w-7xl
          px-4 py-12
        "
      >

        <div
          className="
            mb-10 text-center
          "
        >

          <h1
            className="
              text-4xl font-bold
            "
          >
            Campaign Donasi
          </h1>

          <p
            className="
              mt-4 text-muted-foreground
            "
          >
            Mari berkontribusi
            untuk kegiatan dan
            pembangunan masjid.
          </p>

        </div>

        <CampaignGrid
          campaigns={campaigns}
        />

      </section>

    </div>
  )
}