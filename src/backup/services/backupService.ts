import type { BackupFile } from "../backup.types";


const DUMMY_BACKUPS: BackupFile[] = [
  {
    id: "1",
    filename: "backup-2026-06-10.zip",
    size: 52428800,
    createdAt: "2026-06-10T03:15:00Z",
    latest: true,
  },
  {
    id: "2",
    filename: "backup-2026-06-09.zip",
    size: 48234496,
    createdAt: "2026-06-09T03:10:00Z",
    latest: false,
  },
  {
    id: "3",
    filename: "backup-2026-06-08.zip",
    size: 46871347,
    createdAt: "2026-06-08T03:11:00Z",
    latest: false,
  },
  {
    id: "4",
    filename: "backup-2026-06-07.zip",
    size: 45324567,
    createdAt: "2026-06-07T03:12:00Z",
    latest: false,
  },
  {
    id: "5",
    filename: "backup-2026-06-06.zip",
    size: 44562344,
    createdAt: "2026-06-06T03:08:00Z",
    latest: false,
  },
  {
    id: "6",
    filename: "backup-2026-06-05.zip",
    size: 43892345,
    createdAt: "2026-06-05T03:09:00Z",
    latest: false,
  },
  {
    id: "7",
    filename: "backup-2026-06-04.zip",
    size: 42134567,
    createdAt: "2026-06-04T03:07:00Z",
    latest: false,
  },
  {
    id: "8",
    filename: "backup-2026-06-03.zip",
    size: 40987234,
    createdAt: "2026-06-03T03:05:00Z",
    latest: false,
  },
];

export const backupService = {
  async getBackups(): Promise<BackupFile[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [...DUMMY_BACKUPS];
  },

  async downloadBackup(fileId: string): Promise<void> {
    console.log("Downloading backup:", fileId);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  },

  async restoreBackup(file: File): Promise<void> {
    console.log("Restoring backup:", file.name);

    await new Promise((resolve) => setTimeout(resolve, 2500));
  },
};