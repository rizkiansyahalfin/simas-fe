import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  disabled?: boolean;

  onDownload?: () => Promise<void> | void;

  label?: string;

  className?: string;
}

export function DownloadButton({
  disabled = false,
  onDownload,
  label = "Download",
  className,
}: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      if (onDownload) {
        await onDownload();
      } else {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000),
        );
      }

      toast.success("Laporan berhasil diunduh.");
    } catch {
      toast.error("Gagal mengunduh laporan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={className}
      disabled={disabled || loading}
      onClick={handleDownload}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mengunduh...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}