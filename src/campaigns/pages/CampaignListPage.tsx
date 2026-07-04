// src/features/campaigns/pages/CampaignListPage.tsx

import CampaignGrid
from '../components/CampaignGrid'

import { useCampaigns }
from '../hooks/useCampaigns'

import Seo from '@/lib/Seo'

export default function CampaignListPage() {

  const {
    campaigns,
  } = useCampaigns()

  return (
    <>
      <Seo
        title="Campaign Donasi"
        description="Dukung kampanye donasi untuk kegiatan masjid, pembangunan, dan bantuan sosial melalui SIMAS."
        image="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&q=80"
      />
      <div
        className="
          min-h-screen
          bg-slate-50 dark:bg-slate-950
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
              text-4xl font-bold text-slate-900 dark:text-white
            "
          >
            Campaign Donasi
          </h1>

          <p
            className="
              mt-4 text-slate-500 dark:text-slate-400
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
    </>
  )
}