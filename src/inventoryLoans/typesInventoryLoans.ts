// src/features/inventory-loans/types.ts

export type LoanStatus =
  | 'ACTIVE'
  | 'RETURNED'
  | 'OVERDUE'

export interface InventoryLoan {
  id: string

  itemName: string

  borrowerName: string
  phone: string

  loanDate: string
  estimatedReturnDate: string

  notes?: string

  status: LoanStatus
}