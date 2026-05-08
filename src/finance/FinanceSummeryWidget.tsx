// FinanceSummaryWidget.tsx
import FinanceChart from './FinanceChart'
import FinanceStatCard from './FinanceStatCard'
import RecentTransactionsTable from './RecentTransactionTable'
import { useFinanceSummary } from './useFinanceSummary'


export default function FinanceSummaryWidget() {
  const { data, isLoading } = useFinanceSummary()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="space-y-6">

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceStatCard
          title="Total Pemasukan"
          amount={data.totalIncome}
          type="income"
        />

        <FinanceStatCard
          title="Total Pengeluaran"
          amount={data.totalExpense}
          type="expense"
        />

        <FinanceStatCard
          title="Saldo"
          amount={data.balance}
          type="balance"
        />
      </div>

      {/* chart */}
      <FinanceChart data={data.monthlyChart} />

      {/* transactions */}
      <RecentTransactionsTable
        data={data.recentTransactions}
      />
    </section>
  )
}