// FinanceStatCard.tsx
interface Props {
  title: string
  amount: number
  type: 'income' | 'expense' | 'balance'
}

export default function FinanceStatCard({
  title,
  amount,
  type,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        Rp {amount.toLocaleString('id-ID')}
      </h2>
    </div>
  )
}