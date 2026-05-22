import { Clock } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import { XCircle } from 'lucide-react'

import type { Donasi } from '@/types/donation'

export const SEED: Donasi[] = [
  {
    id:'D001',
    nama:'H. Sulaiman Basir',
    inisial:'SB',
    avatarBg:'bg-emerald-600',
    nominal:500000,
    kategori:'Infaq Masjid',
    tanggal:'12 Okt 2024',
    waktu:'14:30 WIB',
    wa:'0812-XXXX-1234',
    catatan:'Infaq untuk renovasi tempat wudhu.',
    status:'menunggu',
    metode:'Transfer BSI'
  },

  {
    id:'D002',
    nama:'Ibu Siti Aminah',
    inisial:'SA',
    avatarBg:'bg-violet-600',
    nominal:250000,
    kategori:'Sedekah',
    tanggal:'11 Okt 2024',
    waktu:'09:15 WIB',
    wa:'0813-XXXX-5678',
    catatan:'Semoga bermanfaat.',
    status:'terverifikasi',
    metode:'QRIS'
  },
]

export const STATUS_CFG = {
  menunggu: {
    label:'Menunggu',
    badge:'badge badge-waiting',
    dot:'badge-dot dot-waiting',
    icon:Clock,
    footer:'badge-waiting'
  },

  terverifikasi: {
    label:'Terverifikasi',
    badge:'badge badge-ok',
    dot:'badge-dot dot-ok',
    icon:CheckCircle2,
    footer:'badge-ok'
  },

  ditolak: {
    label:'Ditolak',
    badge:'badge badge-rejected',
    dot:'badge-dot dot-rejected',
    icon:XCircle,
    footer:'badge-rejected'
  },
} as const