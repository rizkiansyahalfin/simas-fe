import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { backupService } from "../services/backupService";

export const useRestoreBackup = (
  onSuccessCallback?: () => void,
) => {
  return useMutation({
    mutationFn: async (file: File) => {
      await backupService.restoreBackup(file);
    },

    onSuccess: () => {
      toast.success("Restore berhasil dijalankan.");

      onSuccessCallback?.();
    },

    onError: () => {
      toast.error("Restore backup gagal.");
    },
  });
};
