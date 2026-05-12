// FinanceChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function FinanceChart({ data }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 border h-[400px]">
      <h2 className="text-xl font-semibold mb-4">
        Pemasukan vs Pengeluaran
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <Tooltip />

          <Line dataKey="income" />
          <Line dataKey="expense" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}