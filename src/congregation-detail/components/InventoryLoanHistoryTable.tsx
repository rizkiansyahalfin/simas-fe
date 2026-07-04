// src/features/congregation-detail/components/InventoryLoanHistoryTable.tsx

import { PackageCheck, Plus } from "lucide-react"

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

import type { InventoryLoanHistory } from "../types/congregationDetailTypes"



interface Props {
  data: InventoryLoanHistory[]
}

function formatDate(value?: string) {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export default function InventoryLoanHistoryTable({
  data,
}: Props) {

  return (
    <Card className="h-fit rounded-lg border border-gray-200 bg-white shadow-sm ring-0">
      <CardHeader className="border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:flex-col xl:items-start">
          <div>
            <div className="flex items-center gap-2">
              <PackageCheck className="size-5 text-amber-700" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold text-gray-950">
                Peminjaman Inventaris
              </CardTitle>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Monitoring barang masjid yang pernah dipinjam.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 sm:w-auto xl:w-full"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah Peminjaman
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-100">
              <PackageCheck className="size-6 text-gray-600" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-950">
              Belum ada peminjaman
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Riwayat akan tampil setelah jamaah meminjam inventaris masjid.
            </p>
            <Button
              type="button"
              className="mt-5 w-full bg-emerald-600 text-white transition hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
            >
              <Plus className="size-4" aria-hidden="true" />
              Catat Peminjaman
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableHead className="px-6 text-gray-500">Barang</TableHead>
                <TableHead className="px-6 text-gray-500">Dipinjam</TableHead>
                <TableHead className="px-6 text-gray-500">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <TableCell className="px-6 font-medium text-gray-900">
                    {item.itemName}
                    <p className="mt-1 text-xs text-gray-500">
                      Kembali: {formatDate(item.returnedAt)}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 text-gray-500">
                    {formatDate(item.borrowedAt)}
                  </TableCell>
                  <TableCell className="px-6">
                    <span
                      className={
                        item.status === 'returned'
                          ? "rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          : "rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      }
                    >
                      {item.status === 'returned' ? "Selesai" : "Aktif"}
                    </span>
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
