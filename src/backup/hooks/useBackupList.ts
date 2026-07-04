import { useQuery } from "@tanstack/react-query";
import { backupService } from "../services/backupService";
import type { BackupFile } from "../backup.types";


interface UseBackupListResult {
  data: BackupFile[];
  isLoading: boolean;
}

export const useBackupList = (): UseBackupListResult => {
  const { data, isLoading } = useQuery({
    queryKey: ["backup-list"],
    queryFn: backupService.getBackups,
    staleTime: Infinity,
  });

  return {
    data: data ?? [],
    isLoading,
  };
};