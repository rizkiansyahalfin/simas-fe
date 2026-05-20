import { useState } from "react"
import type { FormEvent } from "react"
import { ArrowRight, HeartHandshake, MailCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DonationStatus = "pending" | "verified" | "rejected"
type DonationFilter = "all" | DonationStatus

interface Donation {
  id: number
  donorName: string
  amount: number
  status: DonationStatus
  emailToTreasurer: boolean
  emailToDonor: boolean
}

const initialDonations: Donation[] = [
  {
    id: 1,
    donorName: "Ahmad Abdullah",
    amount: 100000,
    status: "pending",
    emailToTreasurer: true,
    emailToDonor: false,
  },
  {
    id: 2,
    donorName: "Siti Aminah",
    amount: 250000,
    status: "verified",
    emailToTreasurer: true,
    emailToDonor: true,
  },
  {
    id: 3,
    donorName: "Hamba Allah",
    amount: 50000,
    status: "rejected",
    emailToTreasurer: true,
    emailToDonor: false,
  },
]

const quickAmounts = [50000, 100000, 250000, 500000]

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  maximumFractionDigits: 0,
  style: "currency",
})

const statusBadgeClass: Record<DonationStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
}

const statusLabel: Record<DonationStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  rejected: "Rejected",
}

export default function DonasiMasukPage() {
  const [donations, setDonations] = useState<Donation[]>(initialDonations)
  const [donorName, setDonorName] = useState("")
  const [amount, setAmount] = useState("")
  const [statusFilter, setStatusFilter] = useState<DonationFilter>("all")

  const filteredDonations =
    statusFilter === "all"
      ? donations
      : donations.filter((donation) => donation.status === statusFilter)

  function handleDonationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!donorName.trim() || numericAmount <= 0) {
      return
    }

    setDonations((currentDonations) => [
      {
        amount: numericAmount,
        donorName: donorName.trim(),
        emailToDonor: false,
        emailToTreasurer: true,
        id: Date.now(),
        status: "pending",
      },
      ...currentDonations,
    ])

    setDonorName("")
    setAmount("")
  }

  function handleVerifyDonation(donationId: number) {
    setDonations((currentDonations) =>
      currentDonations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              emailToDonor: true,
              status: "verified",
            }
          : donation
      )
    )
  }

  function handleRejectDonation(donationId: number) {
    setDonations((currentDonations) =>
      currentDonations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              status: "rejected",
            }
          : donation
      )
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              MasjidPortal SIMAS
            </p>
            <h2 className="m-0 mt-1 text-2xl font-semibold tracking-normal text-slate-950">
              Donasi
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Kelola donasi masuk, validasi status donasi, dan tampilkan
              penanda email tanpa backend, API, atau pengiriman email sungguhan.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
            <HeartHandshake className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="border-emerald-200 bg-white shadow-sm">
          <CardHeader className="border-b border-emerald-100">
            <CardTitle className="text-xl text-emerald-950">
              Form Donasi
            </CardTitle>
            <CardDescription>
              Setiap donasi baru otomatis berstatus Pending dan memunculkan
              notifikasi email ke Bendahara.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleDonationSubmit}>
              <div className="space-y-2">
                <Label htmlFor="donor-name">Nama Donatur</Label>
                <Input
                  id="donor-name"
                  onChange={(event) => setDonorName(event.target.value)}
                  placeholder="Contoh: Ahmad Abdullah"
                  value={donorName}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="donation-amount">Nominal Donasi</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      className={
                        Number(amount) === quickAmount
                          ? "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800"
                          : "border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50"
                      }
                      key={quickAmount}
                      onClick={() => setAmount(String(quickAmount))}
                      type="button"
                      variant="outline"
                    >
                      {currencyFormatter
                        .format(quickAmount)
                        .replace(/\s?Rp/, "Rp ")}
                    </Button>
                  ))}
                </div>
                <Input
                  id="donation-amount"
                  min="1"
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Masukkan nominal lainnya"
                  type="number"
                  value={amount}
                />
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <div className="flex items-start gap-2">
                  <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="m-0">
                    Saat tombol dikirim, UI akan menandai:
                    <span className="block font-medium">
                      📧 Notifikasi email telah dikirim ke Bendahara
                    </span>
                  </p>
                </div>
              </div>

              <Button className="h-10 w-full bg-emerald-700 text-white hover:bg-emerald-800">
                Kirim Donasi
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-white shadow-sm">
          <CardHeader className="border-b border-emerald-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <CardTitle className="text-xl text-emerald-950">
                  Tabel Donasi
                </CardTitle>
                <CardDescription>
                  Filter dan ubah status donasi secara frontend-only.
                </CardDescription>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-filter">Filter Status</Label>
                <select
                  className="h-9 w-full min-w-40 rounded-lg border border-emerald-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-100"
                  id="status-filter"
                  onChange={(event) =>
                    setStatusFilter(event.target.value as DonationFilter)
                  }
                  value={statusFilter}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-emerald-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-3 font-medium">Nama Donatur</th>
                    <th className="px-5 py-3 font-medium">Nominal</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">
                      Notifikasi Email
                    </th>
                    <th className="px-5 py-3 text-right font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {donation.donorName}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {currencyFormatter.format(donation.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge className={statusBadgeClass[donation.status]}>
                          {statusLabel[donation.status]}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1.5 text-xs leading-5">
                          {donation.emailToTreasurer && (
                            <p className="m-0 text-emerald-700">
                              📧 Notifikasi email telah dikirim ke Bendahara
                            </p>
                          )}
                          {donation.emailToDonor && (
                            <p className="m-0 text-sky-700">
                              📧 Email konfirmasi telah dikirim ke Donatur
                            </p>
                          )}
                          {!donation.emailToDonor &&
                            donation.status !== "pending" && (
                              <p className="m-0 text-slate-400">
                                Belum ada email konfirmasi ke Donatur.
                              </p>
                            )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {donation.status === "pending" ? (
                            <>
                              <Button
                                className="bg-emerald-700 text-white hover:bg-emerald-800"
                                onClick={() =>
                                  handleVerifyDonation(donation.id)
                                }
                                type="button"
                              >
                                Verifikasi
                              </Button>
                              <Button
                                className="border-red-200 bg-white text-red-600 hover:bg-red-50"
                                onClick={() => handleRejectDonation(donation.id)}
                                type="button"
                                variant="outline"
                              >
                                Tolak
                              </Button>
                            </>
                          ) : (
                            <span className="text-sm text-slate-400">
                              Tidak ada aksi
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDonations.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-slate-500">
                Tidak ada donasi dengan status ini.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
