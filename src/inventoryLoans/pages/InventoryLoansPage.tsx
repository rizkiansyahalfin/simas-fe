// InventoryLoansPage.tsx

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CreateLoanDialog from '../components/CreateLoanDialog'
import InventoryLoanTable from '../components/InventoryLoanTable'
import { useInventoryLoans } from '../hooks/useInventoryLoans'



export default function InventoryLoansPage() {
  const [open, setOpen] = useState(false)

  const { loans } = useInventoryLoans()

  return (
    <section className="space-y-7">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Peminjaman Inventaris
          </h1>

          <p className="text-sm text-slate-500">
            Kelola pencatatan barang yang sedang dipinjam dan status pengembaliannya.
          </p>
        </div>

        <Button
          className="h-11 gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold shadow-lg shadow-emerald-900/15 hover:bg-emerald-800"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="size-4" />
          Catat Peminjaman Baru
        </Button>
      </div>

      <InventoryLoanTable data={loans} />

      <CreateLoanDialog
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  )
}
