// src/features/congregation-detail/components/DonationHistoryTable.tsx

import { CircleDollarSign, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { DonationHistory } from "../types/congregationDetailTypes"


interface Props {
  data: DonationHistory[]
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export default function DonationHistoryTable({
  data,
}: Props) {

  return (
    <Card className="rounded-lg border border-gray-200 bg-white shadow-sm ring-0">
      <CardHeader className="border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="size-5 text-amber-700" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold text-gray-950">
                Riwayat Donasi
              </CardTitle>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Catatan pemasukan dari kontribusi jamaah.
            </p>
          </div>
          <Button
            type="button"
            className="w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah Donasi
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50">
              <CircleDollarSign className="size-6 text-emerald-700" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-950">
              Belum ada riwayat donasi
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Tambahkan transaksi pertama untuk mulai memantau kontribusi
              jamaah.
            </p>
            <Button
              type="button"
              className="mt-5 w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
            >
              <Plus className="size-4" aria-hidden="true" />
              Catat Donasi
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableHead className="px-6 text-gray-500">Donasi</TableHead>
                <TableHead className="px-6 text-gray-500">Tanggal</TableHead>
                <TableHead className="px-6 text-right text-gray-500">
                  Nominal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <TableCell className="px-6 font-medium text-gray-900">
                    {item.title}
                  </TableCell>
                  <TableCell className="px-6 text-gray-500">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell className="px-6 text-right font-semibold text-emerald-600">
                    +Rp{item.amount.toLocaleString('id-ID')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
