// src/features/congregation-attendance/components/AttendanceFilterBar.tsx

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AttendanceStatus } from '../congregationAttendanceTypes';



interface AttendanceFilterBarProps {
  search: string;
  status: AttendanceStatus | 'all';
  onSearchChange: (
    value: string,
  ) => void;
  onStatusChange: (
    value: AttendanceStatus | 'all',
  ) => void;
}

export function AttendanceFilterBar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: AttendanceFilterBarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div className="relative w-full md:max-w-sm">
        <Search
          className="
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-slate-400
          "
        />

        <Input
          value={search}
          placeholder="Cari kegiatan..."
          className="pl-9"
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(
            value as
              | AttendanceStatus
              | 'all',
          )
        }
      >
        <SelectTrigger className="w-full md:w-[220px]">
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            Semua Status
          </SelectItem>

          <SelectItem value="present">
            Hadir
          </SelectItem>

          <SelectItem value="absent">
            Tidak Hadir
          </SelectItem>

          <SelectItem value="excused">
            Izin
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}