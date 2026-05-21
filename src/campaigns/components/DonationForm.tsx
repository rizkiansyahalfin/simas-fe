// src/features/campaigns/components/DonationForm.tsx

import { Button }
from '@/components/ui/button'

import { Input }
from '@/components/ui/input'

import { Label }
from '@/components/ui/label'

export default function DonationForm() {
  return (
    <form
      className="
        space-y-4 rounded-2xl
        border bg-white p-6
      "
    >

      <div className="space-y-2">
        <Label>Nama</Label>

        <Input
          placeholder="Nama donatur"
        />
      </div>

      <div className="space-y-2">
        <Label>Nominal</Label>

        <Input
          type="number"
          placeholder="100000"
        />
      </div>

      <Button className="w-full">
        Donasi Sekarang
      </Button>

    </form>
  )
}