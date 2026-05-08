// useFinanceSummary.ts
export function useFinanceSummary() {
  return {
    data: {
      totalIncome: 45250000,
      totalExpense: 32100000,
      balance: 125800000,

      monthlyChart: [
        { month: 'Jan', income: 10, expense: 8 },
        { month: 'Feb', income: 12, expense: 7 },
      ],

      recentTransactions: [],
    },

    isLoading: false,
  }
}