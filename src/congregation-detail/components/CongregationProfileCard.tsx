// src/features/congregation-detail/components/CongregationProfileCard.tsx

import {
  BadgeCheck,
  CircleDollarSign,
  HandHeart,
  Home,
  Phone,
  UserRound,
} from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import type { CongregationDetail } from '../congregationDetailTypes'
import RevealNikButton
from './RevealNikButton'



interface Props {
  data: CongregationDetail
  totalDonation: number
  totalZis: number
}

export default function CongregationProfileCard({
  data,
  totalDonation,
  totalZis,
}: Props) {
  const stats = [
    {
      label: "Total Donasi",
      value: `Rp${totalDonation.toLocaleString("id-ID")}`,
      icon: CircleDollarSign,
      className: "text-emerald-700",
    },
    {
      label: "Bantuan ZIS",
      value: `Rp${totalZis.toLocaleString("id-ID")}`,
      icon: HandHeart,
      className: "text-amber-700",
    },
    {
      label: "Status",
      value: data.isMustahik ? "Mustahik" : "Jamaah",
      icon: BadgeCheck,
      className: data.isMustahik ? "text-blue-700" : "text-emerald-700",
    },
  ]

  return (
    <Card className="rounded-lg border border-gray-200 bg-white shadow-sm ring-0">
      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50">
                <UserRound className="size-8 text-amber-700" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold text-gray-950">
                    Profil Jamaah
                  </h2>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Aktif
                  </span>
                  {data.isMustahik && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      Mustahik
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Informasi identitas dan kontak utama yang digunakan untuk
                  administrasi masjid.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ProfileField label="Nama Lengkap" value={data.name} />
              <ProfileField label="NIK">
                <RevealNikButton nik={data.nik} />
              </ProfileField>
              <ProfileField label="Jenis Kelamin" value={data.gender} />
              <ProfileField label="Nomor HP">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Phone className="size-4 text-gray-400" aria-hidden="true" />
                  {data.phone}
                </div>
              </ProfileField>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase text-gray-500">
                Alamat
              </p>
              <div className="mt-2 flex gap-2 text-sm font-medium leading-6 text-gray-900">
                <Home className="mt-0.5 size-4 shrink-0 text-gray-400" aria-hidden="true" />
                <span>{data.address}</span>
              </div>
            </div>
          </section>

          <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium uppercase text-gray-500">
                      {item.label}
                    </p>
                    <Icon className={`size-5 ${item.className}`} aria-hidden="true" />
                  </div>
                  <p className={`mt-3 text-lg font-semibold ${item.className}`}>
                    {item.value}
                  </p>
                </div>
              )
            })}
          </aside>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProfileFieldProps {
  label: string
  value?: string
  children?: React.ReactNode
}

function ProfileField({ label, value, children }: ProfileFieldProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-500">
        {label}
      </p>
      <div className="mt-2 text-sm font-medium text-gray-900">
        {children ?? value}
      </div>
    </div>
  )
}
