// src/features/congregation/pages/CongregationPage.tsx

import { useState } from 'react'

import { Button }
from '@/components/ui/button'

import CongregationFormDialog
from '../components/CongregationFormDialog'

export default function CongregationPage() {
  const [open, setOpen] =
    useState(false)

  return (
    <section className="space-y-6">

      <div
        className="
          flex items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl font-bold
            "
          >
            Data Jamaah
          </h1>

          <p
            className="
              text-muted-foreground
            "
          >
            Kelola data jamaah
            masjid
          </p>
        </div>

        <Button
          onClick={() =>
            setOpen(true)
          }
        >
          Tambah Jamaah
        </Button>
      </div>

      <CongregationFormDialog
        open={open}
        onOpenChange={setOpen}
      />

    </section>
  )
}