import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import Badge from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TransactionType = "pemasukan" | "pengeluaran"

interface Transaction {
  id: number
  date: string
  description: string
  type: TransactionType
  amount: number
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-05-01",
    description: "Infak Jumat",
    type: "pemasukan",
    amount: 1250000,
  },
  {
    id: 2,
    date: "2026-05-02",
    description: "Pembelian alat kebersihan",
    type: "pengeluaran",
    amount: 275000,
  },
  {
    id: 3,
    date: "2026-05-03",
    description: "Donasi jamaah",
    type: "pemasukan",
    amount: 800000,
  },
]

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  maximumFractionDigits: 0,
  style: "currency",
})

export default function ManajemenKasPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions)
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<TransactionType>("pemasukan")
  const [amount, setAmount] = useState("")

  const summary = useMemo(() => {
    return transactions.reduce(
      (total, transaction) => {
        if (transaction.type === "pemasukan") {
          total.income += transaction.amount
        } else {
          total.expense += transaction.amount
        }

        total.balance = total.income - total.expense
        return total
      },
      { balance: 0, expense: 0, income: 0 }
    )
  }, [transactions])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!date || !description || !numericAmount) {
      return
    }

    setTransactions((currentTransactions) => [
      {
        amount: numericAmount,
        date,
        description,
        id: Date.now(),
        type,
      },
      ...currentTransactions,
    ])

    setDate("")
    setDescription("")
    setType("pemasukan")
    setAmount("")
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="m-0 text-2xl font-semibold tracking-normal text-slate-900 dark:text-white">
          Manajemen Kas
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Catat transaksi pemasukan dan pengeluaran kas masjid.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Pemasukan</p>
          <p className="mt-2 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
            {currencyFormatter.format(summary.income)}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Pengeluaran</p>
          <p className="mt-2 text-xl font-semibold text-red-600 dark:text-red-400">
            {currencyFormatter.format(summary.expense)}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Saldo Akhir</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {currencyFormatter.format(summary.balance)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <form
          className="space-y-4 rounded-lg border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="m-0 text-lg font-semibold tracking-normal text-slate-900 dark:text-white">
              Form Transaksi
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Tambahkan data pemasukan atau pengeluaran.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-date">Tanggal</Label>
            <Input
              id="transaction-date"
              onChange={(event) => setDate(event.target.value)}
              type="date"
              value={date}
              className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-description">Keterangan</Label>
            <Input
              id="transaction-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Contoh: Infak Jumat"
              value={description}
              className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-type">Jenis Transaksi</Label>
            <select
              className="h-8 w-full rounded-lg border border-input dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              id="transaction-type"
              onChange={(event) =>
                setType(event.target.value as TransactionType)
              }
              value={type}
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-amount">Nominal</Label>
            <Input
              id="transaction-amount"
              min="1"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Contoh: 500000"
              type="number"
              value={amount}
              className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
            Simpan Transaksi
          </Button>
        </form>

        <div className="overflow-hidden rounded-lg border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
          <div className="border-b border-emerald-100 dark:border-slate-700 p-5">
            <h3 className="m-0 text-lg font-semibold tracking-normal text-slate-900 dark:text-white">
              Tabel Transaksi
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Daftar transaksi kas terbaru.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-emerald-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                  <th className="px-4 py-3 font-medium">Keterangan</th>
                  <th className="px-4 py-3 font-medium">Jenis</th>
                  <th className="px-4 py-3 text-right font-medium">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                      Belum ada transaksi kas.
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {transaction.date}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">
                        {transaction.description}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            transaction.type === "pemasukan"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          transaction.type === "pemasukan"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {currencyFormatter.format(transaction.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
