// types.ts
export interface FinanceSummary {
  totalIncome: number
  totalExpense: number
  balance: number

  monthlyChart: {
    month: string
    income: number
    expense: number
  }[]

  recentTransactions: {
    id: string
    date: string
    description: string
    category: string
    type: 'INCOME' | 'EXPENSE'
    amount: number
  }[]
}