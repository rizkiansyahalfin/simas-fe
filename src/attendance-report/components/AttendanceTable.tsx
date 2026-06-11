import {
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AttendanceReportItem } from "../attendance-report.types";

interface AttendanceTableProps {
  data: AttendanceReportItem[];
  isLoading?: boolean;
}

const PAGE_SIZE = 10;

export const AttendanceTable = ({
  data,
  isLoading,
}: AttendanceTableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(
    data.length / PAGE_SIZE
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return data.slice(
      start,
      start + PAGE_SIZE
    );
  }, [page, data]);

  const getBadgeVariant = (
    status: AttendanceReportItem["status"]
  ) => {
    switch (status) {
      case "Sangat Aktif":
        return "default";

      case "Aktif":
        return "secondary";

      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>

        <CardContent className="space-y-3">
          {Array.from({ length: 10 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-full"
              />
            )
          )}
        </CardContent>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Inbox className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">
            Data tidak ditemukan
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Belum ada data kehadiran pada periode
            yang dipilih.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Rekap Kehadiran Jamaah
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Nama Jamaah
                </TableHead>

                <TableHead>Email</TableHead>

                <TableHead>
                  Total Kehadiran
                </TableHead>

                <TableHead>
                  Total Ketidakhadiran
                </TableHead>

                <TableHead>
                  Persentase
                </TableHead>

                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {item.email}
                  </TableCell>

                  <TableCell>
                    {item.totalAttendance}
                  </TableCell>

                  <TableCell>
                    {item.totalAbsent}
                  </TableCell>

                  <TableCell>
                    {item.attendancePercentage}%
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={getBadgeVariant(
                        item.status
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            {page} / {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="icon"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};