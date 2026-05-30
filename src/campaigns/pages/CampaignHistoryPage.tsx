import { formatRupiah } from '@/lib/formatRupiah'
import { useMemo } from 'react'
import { useCampaigns } from '../hooks/useCampaigns'
import type { Campaign } from '../types/campaignsTypes'

function getCampaignStatus(campaign: Campaign) {
  const deadline = new Date(campaign.deadline)
  const today = new Date()
  return deadline < today ? 'Selesai' : 'Berlangsung'
}

export default function CampaignHistoryPage() {
  const { campaigns } = useCampaigns()

  const totalCollected = useMemo(
    () => campaigns.reduce((sum, campaign) => sum + campaign.collectedAmount, 0),
    [campaigns]
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Riwayat Campaign</h1>
          <p className="mt-4 text-muted-foreground">
            Daftar semua campaign publik, termasuk yang sudah selesai, dengan total dana terkumpul dan laporan per campaign.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Dana Terkumpul</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{formatRupiah(totalCollected)}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Total campaign: {campaigns.length}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6 sm:flex sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {getCampaignStatus(campaign)}
                    </span>
                    <span className="text-sm text-slate-500">Deadline: {campaign.deadline}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">{campaign.title}</h2>
                  <p className="mt-3 text-slate-600">{campaign.description}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:text-right">
                  <div>
                    <p className="text-sm text-slate-500">Dana terkumpul</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{formatRupiah(campaign.collectedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Target</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{formatRupiah(campaign.targetAmount)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Laporan:</p>
                <p className="mt-2">
                  Campaign ini telah mengumpulkan {formatRupiah(campaign.collectedAmount)} dari target {formatRupiah(campaign.targetAmount)}, dengan {campaign.donorCount} donor tercatat.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
