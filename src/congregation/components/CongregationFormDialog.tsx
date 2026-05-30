// src/features/congregation/components/CongregationFormDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button }
from '@/components/ui/button'

import { Input }
from '@/components/ui/input'

import { Textarea }
from '@/components/ui/textarea'

import GenderRadioGroup
from './GenderRadioGroup'

import MustahikSection
from './MustahikSection'

import { useCongregationForm }
from '../hooks/useCongregationForm'

interface Props {
  open: boolean

  onOpenChange: (
    value: boolean
  ) => void
}

export default function CongregationFormDialog({
  open,
  onOpenChange,
}: Props) {
  const {
    form,
    updateField,
    resetForm,
  } = useCongregationForm()

  function handleSubmit() {
    resetForm()

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">

        <DialogHeader>
          <DialogTitle>
            Tambah Data Jamaah Baru
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* row */}
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <label>
                Nama Lengkap
              </label>

              <Input
                value={form.fullName}
                onChange={(e) =>
                  updateField(
                    'fullName',
                    e.target.value
                  )
                }
                placeholder="
                Contoh: Muhammad Ikhsan
                "
              />
            </div>

            <div className="space-y-2">
              <label>
                NIK
              </label>

              <Input
                value={form.nik}
                onChange={(e) =>
                  updateField(
                    'nik',
                    e.target.value
                  )
                }
                placeholder="
                327xxxxxxxxxxxx
                "
              />
            </div>

          </div>

          {/* alamat */}
          <div className="space-y-2">

            <label>
              Alamat Sesuai KTP
            </label>

            <Textarea
              rows={4}
              value={form.address}
              onChange={(e) =>
                updateField(
                  'address',
                  e.target.value
                )
              }
              placeholder="
              Jl. Raya Kebon Jeruk...
              "
            />

          </div>

          {/* row */}
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">

              <label>
                Nomor HP / WhatsApp
              </label>

              <Input
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    'phone',
                    e.target.value
                  )
                }
                placeholder="
                0812xxxx
                "
              />

            </div>

            <div className="space-y-2">

              <label>
                Tanggal Lahir
              </label>

              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) =>
                  updateField(
                    'birthDate',
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* gender */}
          <div className="space-y-2">

            <label>
              Jenis Kelamin
            </label>

            <GenderRadioGroup
              value={form.gender}
              onChange={(value) =>
                updateField(
                  'gender',
                  value
                )
              }
            />

          </div>

          {/* mustahik */}
          <MustahikSection
            form={form}
            updateField={updateField}
          />

          {/* button */}
          <div
            className="
              flex justify-end
              gap-3 pt-4
            "
          >
            <Button
              variant="secondary"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Batal
            </Button>

            <Button
              onClick={handleSubmit}
            >
              Simpan Data Jamaah
            </Button>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}