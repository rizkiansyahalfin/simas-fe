import {
  ArrowDownCircle,
  ArrowUpCircle,
  Landmark,
  Loader2,
  LogIn,
  RefreshCw,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useFinanceSummary } from "@/hooks/useFinanceSummary"

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  maximumFractionDigits: 0,
  style: "currency",
})

function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

function formatDateTime(value?: string) {
  if (!value) {
    return "Belum ada pembaruan"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export default function HomePage() {
  const { data: summary, error, isFetching, isLoading, refetch } = useFinanceSummary()

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link className="text-lg font-bold tracking-tight text-emerald-700" to="/">
            SIMAS
          </Link>
          <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
            <Link to="/login">
              <LogIn className="size-4" />
              Login Admin
            </Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_420px] lg:py-12">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit bg-emerald-100 text-emerald-700">
            Sistem Informasi Masjid
          </Badge>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            Transparansi kas masjid yang mudah dipantau jamaah.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Ringkasan keuangan ditampilkan langsung dari data kas terbaru agar
            pemasukan, pengeluaran, dan saldo bisa dilihat secara terbuka.
          </p>
        </div>

        <Card className="rounded-lg border-emerald-100 bg-white shadow-sm">
          <CardHeader className="border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Landmark className="size-5" />
              </div>
              <div>
                <CardTitle>Transparansi Keuangan</CardTitle>
                <CardDescription>
                  Data dari <code>GET /finance/summary</code>
                </CardDescription>
              </div>
            </div>
            <CardAction>
              <Button
                disabled={isFetching}
                onClick={() => refetch()}
                size="icon"
                type="button"
                variant="ghost"
              >
                {isFetching ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <RefreshCw className="size-4" />
                )}
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-4">
            {error ? (
              <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                Ringkasan keuangan belum bisa dimuat. Pastikan endpoint{" "}
                <code>GET /finance/summary</code> sudah aktif.
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-emerald-700">Saldo Saat Ini</p>
                      <p className="mt-1 text-2xl font-bold text-emerald-900">
                        {isLoading
                          ? "Memuat..."
                          : formatCurrency(summary?.balance ?? 0)}
                      </p>
                    </div>
                    <Wallet className="size-8 text-emerald-700" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <ArrowUpCircle className="size-4 text-emerald-600" />
                      Pemasukan
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {isLoading ? "--" : formatCurrency(summary?.income ?? 0)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <ArrowDownCircle className="size-4 text-red-500" />
                      Pengeluaran
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {isLoading ? "--" : formatCurrency(summary?.expense ?? 0)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <span>{summary?.period ?? "Periode berjalan"}</span>
                  <span>{formatDateTime(summary?.lastUpdated)}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
