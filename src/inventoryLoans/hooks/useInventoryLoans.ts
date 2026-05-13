// src/features/inventory-loans/hooks/useInventoryLoans.ts

import { useState } from 'react'
import type { InventoryLoan } from '../typesInventoryLoans'



export function useInventoryLoans() {
  const [loans, setLoans] = useState<
    InventoryLoan[]
  >([
    {
      id: '1',

      itemName: 'Mic Wireless',

      borrowerName: 'Ahmad Fauzi',
      phone: '08123456789',

      loanDate: '2025-05-10',
      estimatedReturnDate: '2025-05-12',

      notes: 'Dipakai kajian',

      status: 'ACTIVE',
    },

    {
      id: '2',

      itemName: 'Proyektor Epson',

      borrowerName: 'Ridwan',
      phone: '081999999',

      loanDate: '2025-05-09',
      estimatedReturnDate: '2025-05-10',

      notes: 'Seminar',

      status: 'OVERDUE',
    },
  ])

  return {
    loans,
    setLoans,
  }
}