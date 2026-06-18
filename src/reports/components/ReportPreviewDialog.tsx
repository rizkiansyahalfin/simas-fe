import { format } from "date-fns";
import { FileText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { DownloadButton } from "./DownloadButton";

import type {
  ReportFilter,
  ReportPreview,
} from "../report.types";

interface ReportPreviewDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  loading?: boolean;

  preview?: ReportPreview;

  filter?: ReportFilter;

  onDownload?: () => Promise<void>;
}

export function ReportPreviewDialog({
  open,
  onOpenChange,
  loading = false,
  preview,
  filter,
  onDownload,
}: ReportPreviewDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-5xl">

        <DialogHeader>

          <DialogTitle className="flex items-center gap-2">

            <FileText className="h-5 w-5" />

            Preview Laporan

          </DialogTitle>

          <DialogDescription>
            Tinjau isi laporan sebelum mengunduh.
          </DialogDescription>

        </DialogHeader>

        {loading ? (
          <div className="space-y-4">

            <Skeleton className="h-24 w-full" />

            <Skeleton className="h-72 w-full" />

            <Skeleton className="h-10 w-40" />

          </div>
        ) : preview ? (
          <div className="space-y-6">

            {/* SUMMARY */}

            <Card>

              <CardContent className="grid gap-5 p-6 md:grid-cols-2">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Nama Laporan
                  </p>

                  <p className="font-semibold">
                    {preview.title}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Jenis Laporan
                  </p>

                  <Badge>
                    {preview.category}
                  </Badge>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Periode
                  </p>

                  <p>
                    {preview.period}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Jumlah Data
                  </p>

                  <p>
                    {preview.totalRows}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Dibuat
                  </p>

                  <p>
                    {format(
                      new Date(preview.createdAt),
                      "dd MMM yyyy",
                    )}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Estimasi Ukuran
                  </p>

                  <p>
                    {preview.estimatedSize}
                  </p>

                </div>

              </CardContent>

            </Card>

            <Separator />

            {/* TABLE */}

            <Card>

              <CardContent className="p-0">

                <Table>

                  <TableHeader>

                    <TableRow>

                      {preview.headers.map((header) => (
                        <TableHead key={header}>
                          {header}
                        </TableHead>
                      ))}

                    </TableRow>

                  </TableHeader>

                  <TableBody>

                    {preview.rows.map((row, index) => (
                      <TableRow key={index}>

                        <TableCell>
                          {row.Nama}
                        </TableCell>

                        <TableCell>
                          {row.Tanggal}
                        </TableCell>

                        <TableCell>
                          {row.Kategori}
                        </TableCell>

                        <TableCell>
                          {row.Nominal}
                        </TableCell>

                        <TableCell>

                          <Badge
                            variant={
                              row.Status === "Selesai"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {row.Status}
                          </Badge>

                        </TableCell>

                      </TableRow>
                    ))}

                  </TableBody>

                </Table>

              </CardContent>

            </Card>

            <div className="flex justify-end">

              <DownloadButton
                onDownload={onDownload}
              />

            </div>

          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">
            Tidak ada preview yang tersedia.
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}