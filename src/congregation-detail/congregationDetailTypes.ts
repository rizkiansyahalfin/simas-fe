// src/features/congregation-detail/types.ts

export interface DonationHistory {
  id: string
  title: string
  amount: number
  date: string
}

export interface ZISHistory {
  id: string
  category: string
  amount: number
  date: string
}

export interface InventoryLoanHistory {
  id: string
  itemName: string
  borrowedAt: string
  returnedAt?: string
  status: 'active' | 'returned'
}

export interface CongregationDetail {
  id: string

  name: string

  nik: string

  gender: string

  address: string

  phone: string

  isMustahik: boolean

  donationHistory: DonationHistory[]

  zisHistory: ZISHistory[]

  inventoryLoans: InventoryLoanHistory[]
}