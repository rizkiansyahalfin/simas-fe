import { useQuery } from "@tanstack/react-query"

import api from "@/lib/axios"

export interface FinanceSummary {
  balance: number
  expense: number
  income: number
  lastUpdated?: string
  period?: string
  transactionCount?: number
}

function unwrapData(value: unknown): unknown {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: unknown }).data
  }

  return value
}

function readNumber(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key]

    if (typeof value === "number") {
      return value
    }

    if (typeof value === "string" && value.trim() !== "") {
      const normalizedValue = Number(value.replace(/[^\d.-]/g, ""))
      if (!Number.isNaN(normalizedValue)) {
        return normalizedValue
      }
    }
  }

  return 0
}

function readString(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === "string") {
      return value
    }
  }

  return undefined
}

function normalizeFinanceSummary(response: unknown) {
  const data = unwrapData(response)
  const source =
    data && typeof data === "object" ? (data as Record<string, unknown>) : {}
  const income = readNumber(source, [
    "income",
    "totalIncome",
    "totalPemasukan",
    "pemasukan",
  ])
  const expense = readNumber(source, [
    "expense",
    "totalExpense",
    "totalPengeluaran",
    "pengeluaran",
  ])

  return {
    balance: readNumber(source, ["balance", "saldo", "currentBalance"]) || income - expense,
    expense,
    income,
    lastUpdated: readString(source, ["lastUpdated", "updatedAt", "updated_at"]),
    period: readString(source, ["period", "periode"]),
    transactionCount: readNumber(source, [
      "transactionCount",
      "totalTransactions",
      "jumlahTransaksi",
    ]),
  } satisfies FinanceSummary
}

export function useFinanceSummary() {
  return useQuery({
    queryFn: async () => {
      const { data } = await api.get("/finance/summary")
      return normalizeFinanceSummary(data)
    },
    queryKey: ["finance", "summary"],
  })
}
