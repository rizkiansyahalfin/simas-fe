import { Database } from "lucide-react";

import { BackupStats } from "../components/BackupStats";
import { BackupTable } from "../components/BackupTable";
import { BackupUploadCard } from "../components/BackupUploadCard";
import { useBackupList } from "../hooks/useBackupList";

export default function BackupPage() {
  const { data, isLoading } = useBackupList();

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border p-2">
                <Database className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Backup & Restore
                </h1>

                <p className="text-muted-foreground">
                  Kelola backup dan restore sistem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <BackupStats backups={data} />

        <BackupUploadCard />

        <BackupTable
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}