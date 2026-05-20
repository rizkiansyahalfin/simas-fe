// src/features/gallery/components/EditCaptionDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Input }
from '@/components/ui/input'

import { Button }
from '@/components/ui/button'

interface Props {
  open: boolean

  onOpenChange: (
    value: boolean
  ) => void

  caption: string

  setCaption: (
    value: string
  ) => void

  onSave: () => void
}

export default function EditCaptionDialog({
  open,
  onOpenChange,
  caption,
  setCaption,
  onSave,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Caption
          </DialogTitle>
        </DialogHeader>

        <Input
          value={caption}
          onChange={(e) =>
            setCaption(
              e.target.value
            )
          }
          placeholder="Masukkan caption..."
        />

        <Button onClick={onSave}>
          Simpan
        </Button>

      </DialogContent>
    </Dialog>
  )
}