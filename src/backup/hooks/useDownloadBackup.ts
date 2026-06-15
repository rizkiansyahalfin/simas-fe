import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { backupService } from "../services/backupService";

export const useDownloadBackup = () => {
  return useMutation({
    mutationFn: async (fileId: string) => {
      toast.info("Mengunduh backup...");

      await backupService.downloadBackup(fileId);
    },

    onSuccess: () => {
      toast.success("Download berhasil dimulai.");
    },

    onError: () => {
      toast.error("Gagal mengunduh backup.");
    },
  });
};