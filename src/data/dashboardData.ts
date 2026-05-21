import { CheckCircle2, Clock, Users, CalendarDays, AlertCircle, Wallet, Heart } from 'lucide-react'

/* ─── Data ─── */
export const KEUANGAN = [
  { bulan: 'Jan', pemasukan: 18200000, pengeluaran: 9500000 },
  { bulan: 'Feb', pemasukan: 22400000, pengeluaran: 11000000 },
  { bulan: 'Mar', pemasukan: 31500000, pengeluaran: 14200000 },
  { bulan: 'Apr', pemasukan: 27800000, pengeluaran: 12800000 },
  { bulan: 'Mei', pemasukan: 35600000, pengeluaran: 16300000 },
  { bulan: 'Jun', pemasukan: 42100000, pengeluaran: 18700000 },
  { bulan: 'Jul', pemasukan: 38900000, pengeluaran: 17200000 },
  { bulan: 'Agu', pemasukan: 45200000, pengeluaran: 19800000 },
]

export const PIE_DATA = [
  { name: 'Infaq Masjid', value: 38, colorClass: 'bg-simas-primary'      },
  { name: 'Zakat Maal',   value: 28, colorClass: 'bg-simas-primary-dark' },
  { name: 'Sedekah',      value: 20, colorClass: 'bg-emerald-300'         },
  { name: 'Wakaf',        value: 9,  colorClass: 'bg-simas-primary-deep'  },
  { name: 'Operasional',  value: 5,  colorClass: 'bg-emerald-200'         },
]

export const PIE_COLORS = ['#10b981', '#059669', '#6ee7b7', '#047857', '#a7f3d0']

export const AKTIVITAS = [
  { Icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Donasi Rp 500.000 dari H. Sulaiman diverifikasi', time: '5 menit lalu' },
  { Icon: Clock,        bg: 'bg-amber-50',   color: 'text-amber-600',   label: '3 donasi baru menunggu verifikasi',              time: '12 menit lalu' },
  { Icon: Users,        bg: 'bg-sky-50',     color: 'text-sky-600',     label: 'Jamaah baru: Dewi Rahayu terdaftar',             time: '1 jam lalu' },
  { Icon: CalendarDays, bg: 'bg-violet-50',  color: 'text-violet-600',  label: "Jadwal Jumat Minggu ke-3 belum diisi",           time: '2 jam lalu' },
  { Icon: AlertCircle,  bg: 'bg-red-50',     color: 'text-red-500',     label: 'Inventaris: Karpet masjid perlu penggantian',    time: '3 jam lalu' },
]

export const KPI = [
  { label: 'Total Pemasukan',  value: 'Rp 128,8 Jt', sub: 'Bulan ini',        trend: '+12%', up: true,  Icon: Wallet,       iconBg: 'icon-wrap-green'  },
  { label: 'Total Donasi',     value: 'Rp 45,2 Jt',  sub: 'Bulan ini',        trend: '+8%',  up: true,  Icon: Heart,        iconBg: 'icon-wrap-amber'  },
  { label: 'Total Jamaah',     value: '1.284',        sub: 'Terdaftar aktif',  trend: '+23',  up: true,  Icon: Users,        iconBg: 'icon-wrap-blue'   },
  { label: 'Mustahik Aktif',   value: '156',          sub: 'Penerima bantuan', trend: '-4',   up: false, Icon: Heart,        iconBg: 'icon-wrap-purple' },
]