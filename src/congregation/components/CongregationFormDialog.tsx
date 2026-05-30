// src/features/congregation/components/CongregationFormDialog.tsx

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import GenderRadioGroup from './GenderRadioGroup'
import MustahikSection from './MustahikSection'
import { useCongregationForm } from '../hooks/useCongregationForm'
import { validateForm, required } from '@/lib/validate'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export default function CongregationFormDialog({
  open,
  onOpenChange,
}: Props) {
  const { form, updateField, resetForm } = useCongregationForm()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateForm(form, {
      fullName: [required("Nama lengkap")],
      nik: [required("NIK")],
      address: [required("Alamat")],
      phone: [required("Nomor HP")],
      birthDate: [required("Tanggal lahir")],
    })
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    toast.success("Data jamaah berhasil disimpan.")
    resetForm()
    setErrors({})
    onOpenChange(false)
  }

  function handleField(key: string, value: string) {
    updateField(key as keyof typeof form, value as never)
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next })
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

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <label>Nama Lengkap</label>
              <Input
                value={form.fullName}
                onChange={(e) => handleField('fullName', e.target.value)}
                placeholder="Contoh: Muhammad Ikhsan"
                className={errors.fullName ? "border-red-400" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <label>NIK</label>
              <Input
                value={form.nik}
                onChange={(e) => handleField('nik', e.target.value)}
                placeholder="327xxxxxxxxxxxx"
                className={errors.nik ? "border-red-400" : ""}
              />
              {errors.nik && <p className="text-sm text-red-500">{errors.nik}</p>}
            </div>

          </div>

          <div className="space-y-2">
            <label>Alamat Sesuai KTP</label>
            <Textarea
              rows={4}
              value={form.address}
              onChange={(e) => handleField('address', e.target.value)}
              placeholder="Jl. Raya Kebon Jeruk..."
              className={errors.address ? "border-red-400" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <label>Nomor HP / WhatsApp</label>
              <Input
                value={form.phone}
                onChange={(e) => handleField('phone', e.target.value)}
                placeholder="0812xxxx"
                className={errors.phone ? "border-red-400" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label>Tanggal Lahir</label>
              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) => handleField('birthDate', e.target.value)}
                className={errors.birthDate ? "border-red-400" : ""}
              />
              {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
            </div>

          </div>

          <div className="space-y-2">
            <label>Jenis Kelamin</label>
            <GenderRadioGroup
              value={form.gender}
              onChange={(value) => handleField('gender', value)}
            />
          </div>

          <MustahikSection form={form} updateField={updateField as never} />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">
              Simpan Data Jamaah
            </Button>
          </div>

        </form>

      </DialogContent>
    </Dialog>
  )
}