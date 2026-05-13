import MustahikFilterBar from '../components/MustahikFilterBar'
import MustahikStats from '../components/MustahikStats'
import MustahikTable from '../components/MustahikTable'
import DistributionHistoryTable from '../components/DistributionHistoryTable'

import { useMustahik } from '../hooks/useMustahik'

export default function MustahikPage() {
  const {
    mustahikData,
    distributionHistory,
  } = useMustahik()

  return (
    <div className="space-y-6 p-6 bg-[#F7FAF7] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">
          Manajemen Mustahik
        </h1>

        <p className="text-muted-foreground mt-1">
          Kelola data mustahik dan
          distribusi bantuan
        </p>
      </div>

      <MustahikStats />

      <MustahikFilterBar />

      <MustahikTable data={mustahikData} />

      <DistributionHistoryTable
        data={distributionHistory}
      />
    </div>
  )
}