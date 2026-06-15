import { useMemo, useState } from "react";
import {
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";

import { format, subDays } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EmptyReport } from "./EmptyReport";

import type {
  ReportHistory,
} from "../report.types";

interface ReportHistoryTableProps {
  history: ReportHistory[];

  loading?: boolean;

  onView?: (item: ReportHistory) => void;

  onDownload?: (item: ReportHistory) => void;

  onDelete?: (item: ReportHistory) => void;
}

const PAGE_SIZE = 10;

type FilterType =
  | "ALL"
  | "TODAY"
  | "7_DAYS"
  | "30_DAYS";

export function ReportHistoryTable({
  history,
  loading = false,
  onView,
  onDownload,
  onDelete,
}: ReportHistoryTableProps) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState<FilterType>("ALL");

  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => {
    const keyword = search.toLowerCase();

    return history.filter((item) => {
      const matchSearch =
        item.reportName
          .toLowerCase()
          .includes(keyword) ||
        item.downloadedBy
          .toLowerCase()
          .includes(keyword) ||
        item.category
          .toLowerCase()
          .includes(keyword);

      if (!matchSearch) return false;

      if (filter === "ALL") {
        return true;
      }

      const reportDate = new Date(item.downloadedAt);

      const today = new Date();

      if (filter === "TODAY") {
        return (
          format(reportDate, "yyyy-MM-dd") ===
          format(today, "yyyy-MM-dd")
        );
      }

      if (filter === "7_DAYS") {
        return reportDate >= subDays(today, 7);
      }

      if (filter === "30_DAYS") {
        return reportDate >= subDays(today, 30);
      }

      return true;
    });
  }, [history, search, filter]);

  const totalPages = Math.ceil(
    filteredHistory.length / PAGE_SIZE,
  );

  const paginatedData = useMemo(() => {
    const start =
      (page - 1) * PAGE_SIZE;

    return filteredHistory.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [filteredHistory, page]);

  return (
    <Card>

      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <CardTitle>
          Riwayat Download
        </CardTitle>

        <div className="flex flex-col gap-3 md:flex-row">

          {/* SEARCH */}

          <div className="relative">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari laporan..."
              className="pl-9 md:w-72"
            />

          </div>

          {/* FILTER */}

          <div className="flex gap-2 flex-wrap">

            {[
              {
                label: "Semua",
                value: "ALL",
              },
              {
                label: "Hari Ini",
                value: "TODAY",
              },
              {
                label: "7 Hari",
                value: "7_DAYS",
              },
              {
                label: "30 Hari",
                value: "30_DAYS",
              },
            ].map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={
                  filter === item.value
                    ? "default"
                    : "outline"
                }
                onClick={() => {
                  setFilter(
                    item.value as FilterType,
                  );

                  setPage(1);
                }}
              >
                {item.label}
              </Button>
            ))}

          </div>

        </div>

      </CardHeader>

      <CardContent>

        <ScrollArea className="w-full">

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Tanggal
                </TableHead>

                <TableHead>
                  Nama Laporan
                </TableHead>

                <TableHead>
                  Jenis
                </TableHead>

                <TableHead>
                  Format
                </TableHead>

                <TableHead>
                  Ukuran
                </TableHead>

                <TableHead>
                  Download Oleh
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="text-right">
                  Action
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>              {loading ? (
                Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={8}>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-12"
                  >
                    <EmptyReport />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {format(
                        new Date(item.downloadedAt),
                        "dd MMM yyyy",
                      )}
                    </TableCell>

                    <TableCell className="font-medium">
                      {item.reportName}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {item.category}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {item.format}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {item.size}
                    </TableCell>

                    <TableCell>
                      {item.downloadedBy}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              onView?.(item)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              onDownload?.(item)
                            }
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Lagi
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              onDelete?.(item)
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus Riwayat
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        {!loading && totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              Menampilkan{" "}
              {(page - 1) * PAGE_SIZE + 1}
              {" - "}
              {Math.min(
                page * PAGE_SIZE,
                filteredHistory.length,
              )}{" "}
              dari {filteredHistory.length} data
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
              >
                Previous
              </Button>

              <span className="min-w-24 text-center text-sm font-medium">
                Page {page} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}