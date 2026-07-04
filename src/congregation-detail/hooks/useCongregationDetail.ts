// src/features/congregation-detail/hooks/useCongregationDetail.ts

import { useCallback, useMemo } from "react"
import type { CongregationDetail } from '../types/congregationDetailTypes'



export function useCongregationDetail() {

  const data =
    useMemo<CongregationDetail>(
      () => ({
        id: '1',

        name: 'Ahmad Fauzi',

        nik: '3201123456789012',

        gender: 'Laki-laki',

        address:
          'Jl. Merdeka No. 12',

        phone:
          '081234567890',

        isMustahik: true,

        donationHistory: [
          {
            id: '1',
            title:
              'Donasi Ramadhan',
            amount: 500000,
            date:
              '2026-05-12',
          },
          {
            id: '2',
            title:
              'Infaq Jumat',
            amount: 150000,
            date:
              '2026-05-17',
          },
        ],

        zisHistory: [
          {
            id: '1',
            category:
              'Bantuan Sembako',
            amount: 300000,
            date:
              '2026-04-10',
          },
          {
            id: '2',
            category:
              'Bantuan Pendidikan',
            amount: 450000,
            date:
              '2026-03-18',
          },
        ],

        inventoryLoans: [
          {
            id: '1',
            itemName:
              'Sound System',
            borrowedAt:
              '2026-05-01',
            returnedAt:
              '2026-05-03',
            status:
              'returned',
          },
          {
            id: '2',
            itemName:
              'Karpet Aula',
            borrowedAt:
              '2026-05-20',
            status:
              'active',
          },
        ],
      }),
      []
    )

  const refetch = useCallback(() => {
    return data
  }, [data])

  return {
    data,
    isLoading: false,
    isError: false,
    refetch,
  }
}
