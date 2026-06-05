// src/features/congregation-attendance/components/AttendanceTable.tsx

import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AttendanceFilterBar } from './AttendanceFilterBar';

import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import type { AttendanceRecord, AttendanceStatus } from '../congregationAttendanceTypes';



interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const PAGE_SIZE = 5;

export function AttendanceTable({
  records,
}: AttendanceTableProps) {
  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState<
      AttendanceStatus | 'all'
    >('all');

  const [page, setPage] =
    useState(1);

  const filteredRecords =
    useMemo(() => {
      return records.filter(
        (record) => {
          const matchesSearch =
            record.eventName
              .toLowerCase()
              .includes(
                search.toLowerCase(),
              );

          const matchesStatus =
            status === 'all'
              ? true
              : record.status ===
                status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [records, search, status]);

  const totalPages =
    Math.ceil(
      filteredRecords.length /
        PAGE_SIZE,
    ) || 1;

  const paginatedRecords =
    filteredRecords.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE,
    );

  const formatDate = (
    date: string,
  ) => {
    return new Date(
      date,
    ).toLocaleDateString(
      'id-ID',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      },
    );
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="space-y-4">
        <CardTitle>
          Sesi yang Diikuti
        </CardTitle>

        <AttendanceFilterBar
          search={search}
          status={status}
          onSearchChange={(
            value,
          ) => {
            setPage(1);
            setSearch(value);
          }}
          onStatusChange={(
            value,
          ) => {
            setPage(1);
            setStatus(value);
          }}
        />
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Kegiatan
                </TableHead>

                <TableHead>
                  Kategori
                </TableHead>

                <TableHead>
                  Tanggal
                </TableHead>

                <TableHead>
                  Lokasi
                </TableHead>

                <TableHead>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedRecords.map(
                (record) => (
                  <TableRow
                    key={
                      record.id
                    }
                  >
                    <TableCell className="font-medium">
                      {
                        record.eventName
                      }
                    </TableCell>

                    <TableCell>
                      {
                        record.category
                      }
                    </TableCell>

                    <TableCell>
                      {formatDate(
                        record.date,
                      )}
                    </TableCell>

                    <TableCell>
                      {
                        record.location
                      }
                    </TableCell>

                    <TableCell>
                      <AttendanceStatusBadge
                        status={
                          record.status
                        }
                      />
                    </TableCell>
                  </TableRow>
                ),
              )}

              {paginatedRecords.length ===
                0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="
                      py-10
                      text-center
                      text-slate-500
                    "
                  >
                    Tidak ada data
                    yang sesuai
                    dengan filter
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <p className="text-sm text-slate-500">
            Menampilkan{' '}
            {
              paginatedRecords.length
            }{' '}
            dari{' '}
            {
              filteredRecords.length
            }{' '}
            data
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    prev - 1,
                )
              }
            >
              Sebelumnya
            </Button>

            <Button
              variant="outline"
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    prev + 1,
                )
              }
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}