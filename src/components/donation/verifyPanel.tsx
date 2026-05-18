import { useState } from 'react'

import {
  X,
  ExternalLink,
  Phone,
  Calendar,
  Tag,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { STATUS_CFG } from '@/data/donationSeed'
import { formatRupiah } from '@/utils/formatRupiah'

import type { Donasi } from '@/types/donation'

export function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setOk(true)

        setTimeout(() => setOk(false), 2000)
      }}
      className={`copy-btn ${ok ? 'copied' : ''}`}
    >
      {ok ? '✓ Tersalin' : '⎘ Salin'}
    </button>
  )
}

interface VerifyPanelProps {
  d: Donasi
  onClose: () => void
  onVerify: (id: string) => void
  onTolak: (id: string) => void
}

export default function VerifyPanel({
  d,
  onClose,
  onVerify,
  onTolak
}: VerifyPanelProps) {

  const s = STATUS_CFG[d.status]
  const Icon = s.icon

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />

      <aside className="slide-panel">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">
              {d.id}
            </p>

            <h2 className="text-xl font-black text-gray-900">
              {d.nama}
            </h2>

            <p className="text-2xl font-black text-simas-primary-dark mt-1">
              {formatRupiah(d.nominal)}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1">

            <span className={s.badge}>
              <span className={s.dot} />
              {s.label}
            </span>

            <Button
              onClick={onClose}
              className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="size-4 text-gray-500" />
            </Button>

          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          <div className="grid grid-cols-2 gap-3">

            <div className="card-inner">
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar className="size-3.5 text-gray-400" />

                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Tanggal
                </p>
              </div>

              <p className="text-sm font-bold text-gray-800">
                {d.tanggal}
              </p>

              <p className="text-xs text-gray-400">
                {d.waktu}
              </p>
            </div>

            <div className="card-inner">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag className="size-3.5 text-gray-400" />

                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Kategori
                </p>
              </div>

              <span className="pill">
                {d.kategori}
              </span>
            </div>

          </div>

          <div className="card-inner">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Metode Pembayaran
            </p>

            <p className="text-sm font-bold text-gray-800">
              {d.metode}
            </p>
          </div>

          {d.wa !== '-' && (
            <div className="card-inner">

              <div className="flex items-center gap-1.5 mb-1">
                <Phone className="size-3.5 text-gray-400" />

                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Nomor WhatsApp
                </p>
              </div>

              <p className="text-sm font-bold text-gray-800">
                {d.wa}
              </p>

            </div>
          )}

          {/* Bukti */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Bukti Transfer
              </p>

              <button className="flex items-center gap-1 text-xs font-semibold text-simas-primary hover:underline">
                Buka di Tab Baru
                <ExternalLink className="size-3" />
              </button>

            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 h-48 flex flex-col items-center justify-center gap-2 text-gray-300">

              <div className="size-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Eye className="size-6 text-gray-300" />
              </div>

              <p className="text-xs font-medium">
                bukti_transfer_{d.id}.jpg
              </p>

            </div>

          </div>

          {/* Catatan */}
          {d.catatan && (
            <div className="info-box">

              <div className="info-box-icon">
                <Tag className="size-4 text-amber-600" />
              </div>

              <div>
                <p className="text-xs font-bold text-simas-accent uppercase tracking-wider mb-1">
                  Catatan Donatur
                </p>

                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{d.catatan}"
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 space-y-3">

          {d.status === 'menunggu' ? (
            <>
              <button
                onClick={() => onVerify(d.id)}
                className="btn-verify"
              >
                <CheckCircle2 className="size-4" />
                Verifikasi (Terima)
              </button>

              <button
                onClick={() => onTolak(d.id)}
                className="btn-reject"
              >
                <XCircle className="size-4" />
                Tolak
              </button>
            </>
          ) : (
            <div className={`w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold ${s.footer}`}>
              <Icon className="size-4" />
              Donasi telah {s.label.toLowerCase()}
            </div>
          )}

        </div>

      </aside>
    </>
  )
}