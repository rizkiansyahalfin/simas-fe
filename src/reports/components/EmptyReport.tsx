import { FileSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyReportProps {
  title?: string;

  description?: string;

  buttonText?: string;

  onAction?: () => void;
}

export function EmptyReport({
  title = "Belum ada riwayat laporan",
  description = "Riwayat download laporan akan muncul di sini setelah Anda mengunduh laporan.",
  buttonText,
  onAction,
}: EmptyReportProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-5 rounded-full bg-muted p-5">
        <FileSearch className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {buttonText && onAction && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}