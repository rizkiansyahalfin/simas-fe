// src/features/inventory-loans/components/CreateLoanDialog.tsx

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDownIcon, ClipboardPenIcon } from 'lucide-react'

interface Props {
  open: boolean

  onOpenChange: (
    value: boolean
  ) => void
}

export default function CreateLoanDialog({
  open,
  onOpenChange,
}: Props) {
  const labelClass =
    'text-xs font-bold uppercase tracking-[0.14em] text-slate-600'
  const fieldClass =
    'h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 text-sm shadow-inner shadow-slate-900/[0.02] focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15'

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl shadow-slate-950/20 sm:max-w-[640px]">

        <DialogHeader className="border-b border-emerald-100 bg-emerald-50/70 px-10 py-7">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-emerald-800">
            <ClipboardPenIcon className="size-5" />
            Catat Peminjaman Baru
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-10 py-8">

          {/* barang */}
          <div className="space-y-2">
            <label className={labelClass}>
              Nama Barang
            </label>

            <div className="relative">
              <select
                className={`${fieldClass} w-full appearance-none pr-11 text-slate-700 outline-none`}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih Inventaris...
                </option>
                <option value="mic-wireless">Mic Wireless</option>
                <option value="proyektor-epson">Proyektor Epson</option>
                <option value="speaker-portable">Speaker Portable</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          {/* nama + phone */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="space-y-2">
              <label className={labelClass}>
                Nama Peminjam
              </label>

              <Input
                className={fieldClass}
                placeholder="Nama Lengkap"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                No. HP / WhatsApp
              </label>

              <Input
                className={fieldClass}
                placeholder="08..."
              />
            </div>

          </div>

          {/* tanggal */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="space-y-2">
              <label className={labelClass}>
                Tanggal Pinjam
              </label>

              <Input
                className={fieldClass}
                type="date"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                Estimasi Kembali
              </label>

              <Input
                className={fieldClass}
                type="date"
              />
            </div>

          </div>

          {/* catatan */}
          <div className="space-y-2">
            <label className={labelClass}>
              Keperluan / Catatan
            </label>

            <Textarea
              className="min-h-28 resize-none rounded-xl border-slate-200 bg-slate-50/70 px-4 py-4 text-sm shadow-inner shadow-slate-900/[0.02] focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15"
              rows={4}
              placeholder="Contoh: Digunakan untuk kajian rutin Jumat malam"
            />
          </div>

          {/* button */}
          <div className="grid gap-4 pt-3 sm:grid-cols-[180px_1fr]">

            <Button
              variant="secondary"
              className="h-12 rounded-xl bg-slate-100 text-base font-bold text-slate-600 hover:bg-slate-200"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Batal
            </Button>

            <Button className="h-12 rounded-xl bg-emerald-700 text-base font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-800">
              Simpan Peminjaman
            </Button>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}
