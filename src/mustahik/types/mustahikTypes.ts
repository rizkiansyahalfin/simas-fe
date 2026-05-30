export type MustahikCategory =
  | 'Fakir'
  | 'Miskin'
  | 'Fisabilillah'
  | 'Ibnu Sabil'
  | 'Muallaf'

export interface Mustahik {
  id: string
  name: string
  nik: string
  address: string
  gender: 'Laki-laki' | 'Perempuan'
  category: MustahikCategory
  phone: string
  totalReceived: number
  lastDistribution: string
}

export interface DistributionHistory {
  id: string
  recipientName: string
  category: MustahikCategory
  amount: number
  date: string
  status: 'Selesai' | 'Pending'
}