import { useEffect, useState } from "react";

import { ShieldAlert } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRestoreBackup } from "../hooks/useRestoreBackup";

interface RestoreConfirmDialogProps {
  open: boolean;
  file: File | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const RestoreConfirmDialog = ({
  open,
  file,
  onClose,
  onSuccess,
}: RestoreConfirmDialogProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmation, setConfirmation] =
    useState("");

  const restoreMutation =
    useRestoreBackup(() => {
      setStep(1);
      setConfirmation("");
      onSuccess();
    });

  useEffect(() => {
    if (!open) {
      setStep(1);
      setConfirmation("");
    }
  }, [open]);

  const handleRestore = () => {
    if (!file) return;

    restoreMutation.mutate(file);
  };

  const handleClose = () => {
    if (restoreMutation.isPending) return;

    setStep(1);
    setConfirmation("");

    onClose();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <AlertDialogContent>
        {step === 1 ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Restore Backup
              </AlertDialogTitle>

              <AlertDialogDescription className="space-y-3">
                <p>
                  File yang dipilih:
                </p>

                <p className="font-medium text-foreground">
                  {file?.name}
                </p>

                <p className="text-destructive">
                  Data saat ini akan
                  ditimpa.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-5 w-5" />
                PERINGATAN
              </AlertDialogTitle>

              <AlertDialogDescription className="space-y-2">
                <p>
                  Restore akan mengganti
                  seluruh data sistem.
                </p>

                <p>
                  Tindakan ini tidak dapat
                  dibatalkan.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Ketik RESTORE untuk
                melanjutkan
              </label>

              <Input
                value={confirmation}
                onChange={(e) =>
                  setConfirmation(
                    e.target.value,
                  )
                }
                placeholder="RESTORE"
              />
            </div>

            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                disabled={
                  restoreMutation.isPending
                }
              >
                Kembali
              </Button>

              <Button
                variant="destructive"
                onClick={handleRestore}
                disabled={
                  confirmation !==
                    "RESTORE" ||
                  restoreMutation.isPending
                }
              >
                {restoreMutation.isPending
                  ? "Memproses..."
                  : "Restore Sekarang"}
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};