import type { DistributionHistory, Mustahik } from "../mustahikTypes"


export function useMustahik() {
  const mustahikData: Mustahik[] = [
    {
      id: '1',
      name: 'Ahmad Fauzi',
      nik: '3174xxxxxxxx1002',
      address: 'Jl. Kemang Jakarta',
      gender: 'Laki-laki',
      category: 'Fakir',
      phone: '08123456789',
      totalReceived: 3500000,
      lastDistribution: '12 Mei 2026',
    },
    {
      id: '2',
      name: 'Siti Aminah',
      nik: '3174xxxxxxxx2391',
      address: 'Jl. Palmerah Barat',
      gender: 'Perempuan',
      category: 'Miskin',
      phone: '0811111111',
      totalReceived: 2500000,
      lastDistribution: '01 Mei 2026',
    },
  ]

  const distributionHistory: DistributionHistory[] = [
    {
      id: '1',
      recipientName: 'Ahmad Fauzi',
      category: 'Fakir',
      amount: 500000,
      date: '12 Mei 2026',
      status: 'Selesai',
    },
    {
      id: '2',
      recipientName: 'Siti Aminah',
      category: 'Miskin',
      amount: 300000,
      date: '01 Mei 2026',
      status: 'Pending',
    },
  ]

  return {
    mustahikData,
    distributionHistory,
  }
}