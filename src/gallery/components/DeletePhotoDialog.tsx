// src/features/gallery/components/DeletePhotoDialog.tsx

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  open: boolean

  onOpenChange: (
    value: boolean
  ) => void

  onConfirm: () => void
}

export default function DeletePhotoDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Hapus Foto?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Foto yang dihapus tidak bisa
            dikembalikan lagi.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="
              bg-red-600
              hover:bg-red-700
            "
          >
            Hapus
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}