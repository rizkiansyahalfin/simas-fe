import {
  Calendar,
  Database,
  HardDrive,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  formatBytes,
  formatDate,
} from "../utils/backup.utils";
import type { BackupFile } from "../backup.types";

interface BackupStatsProps {
  backups: BackupFile[];
}

export const BackupStats = ({
  backups,
}: BackupStatsProps) => {
  const totalBackup = backups.length;

  const totalStorage = backups.reduce(
    (acc, backup) => acc + backup.size,
    0,
  );

  const latestBackup = backups.find(
    (backup) => backup.latest,
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Total Backup
            </p>

            <h3 className="text-3xl font-bold">
              {totalBackup}
            </h3>

            <Badge variant="secondary">
              Backup Files
            </Badge>
          </div>

          <Database className="h-10 w-10 text-muted-foreground" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Total Storage
            </p>

            <h3 className="text-3xl font-bold">
              {formatBytes(totalStorage)}
            </h3>

            <Badge variant="secondary">
              Storage Used
            </Badge>
          </div>

          <HardDrive className="h-10 w-10 text-muted-foreground" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Latest Backup
            </p>

            <h3 className="text-sm font-semibold">
              {latestBackup
                ? formatDate(latestBackup.createdAt)
                : "-"}
            </h3>

            <Badge>
              Latest
            </Badge>
          </div>

          <Calendar className="h-10 w-10 text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  );
};