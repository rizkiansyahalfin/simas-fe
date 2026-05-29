// src/features/congregation-detail/pages/CongregationDetailPage.tsx

import { ArrowLeft, Download, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"

import CongregationProfileCard
from '../components/CongregationProfileCard'

import DonationHistoryTable
from '../components/DonationHistoryTable'

import ZISHistoryTable
from '../components/ZISHistoryTable'

import InventoryLoanHistoryTable
from '../components/InventoryLoanHistoryTable'

import CongregationDetailSkeleton
from '../components/CongregationDetailSkeleton'

import CongregationEmptyState
from '../components/CongregationEmptyState'

import CongregationErrorState
from '../components/CongregationErrorState'

import {
  useCongregationDetail,
} from '../hooks/useCongregationDetail'

export default function CongregationDetailPage() {

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCongregationDetail()

  if (isLoading) {
    return (
      <CongregationDetailSkeleton />
    )
  }

  if (isError) {
    return (
      <CongregationErrorState
        onRetry={refetch}
      />
    )
  }

  if (!data) {
    return (
      <CongregationEmptyState />
    )
  }

  const totalDonation =
    data.donationHistory.reduce(
      (total, item) => total + item.amount,
      0
    )

  const totalZis =
    data.zisHistory.reduce(
      (total, item) => total + item.amount,
      0
    )

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
      "
    >

      <div
        className="
          mx-auto max-w-7xl
          space-y-6
          px-4 py-6
          sm:px-6 lg:px-8
        "
      >

        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 sm:w-auto"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Daftar Jamaah
            </Button>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-amber-700">
                <UserRound className="size-4" aria-hidden="true" />
                Detail administrasi jamaah
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-normal text-gray-950">
                {data.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Ringkasan profil, kontribusi, bantuan ZIS, dan peminjaman
                inventaris jamaah.
              </p>
            </div>
          </div>

          <Button
            type="button"
            className="w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
          >
            <Download className="size-4" aria-hidden="true" />
            Unduh Ringkasan
          </Button>
        </header>

        <CongregationProfileCard
          data={data}
          totalDonation={totalDonation}
          totalZis={totalZis}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <DonationHistoryTable
              data={
                data.donationHistory
              }
            />

            {data.isMustahik && (
              <ZISHistoryTable
                data={data.zisHistory}
              />
            )}
          </div>

          <InventoryLoanHistoryTable
            data={
              data.inventoryLoans
            }
          />
        </div>

      </div>

    </div>
  )
}
