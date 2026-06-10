import {
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  DragEvent,
} from "react";

import {
  FileArchive,
  Upload,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { RestoreConfirmDialog } from "./RestoreConfirmDialog";

const MAX_FILE_SIZE =
  100 * 1024 * 1024;

const ACCEPTED_EXTENSIONS = [
  ".zip",
  ".sql",
];

export const BackupUploadCard = () => {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const validateFile = (
    file: File,
  ): boolean => {
    const extension = `.${file.name
      .split(".")
      .pop()
      ?.toLowerCase()}`;

    if (
      !ACCEPTED_EXTENSIONS.includes(
        extension,
      )
    ) {
      toast.error(
        "Hanya file .zip atau .sql yang diperbolehkan.",
      );

      return false;
    }

    if (
      file.size > MAX_FILE_SIZE
    ) {
      toast.error(
        "Ukuran file maksimal 100 MB.",
      );

      return false;
    }

    return true;
  };

  const handleFileSelect = (
    file: File,
  ) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    handleFileSelect(file);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    if (!file) return;

    handleFileSelect(file);
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
  };

  const handleRestoreSuccess =
    () => {
      setDialogOpen(false);
      setSelectedFile(null);

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }
    };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">
                Restore Backup
              </h3>

              <p className="text-sm text-muted-foreground">
                Upload file backup
                untuk melakukan
                restore sistem.
              </p>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={
                handleDragOver
              }
              className="rounded-lg border-2 border-dashed p-10 text-center transition-colors hover:bg-muted/30"
            >
              <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

              <p className="font-medium">
                Drag & Drop file
                backup
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Mendukung .zip dan
                .sql (maks 100 MB)
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                Pilih File
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".zip,.sql"
                className="hidden"
                onChange={
                  handleInputChange
                }
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <FileArchive className="h-5 w-5" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {
                      selectedFile.name
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    File siap
                    direstore
                  </p>
                </div>
              </div>
            )}

            <Button
              className="w-full md:w-auto"
              disabled={
                !selectedFile
              }
              onClick={() =>
                setDialogOpen(true)
              }
            >
              Restore Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      <RestoreConfirmDialog
        open={dialogOpen}
        file={selectedFile}
        onClose={() =>
          setDialogOpen(false)
        }
        onSuccess={
          handleRestoreSuccess
        }
      />
    </>
  );
};
