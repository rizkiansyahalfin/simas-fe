// src/features/congregation-attendance/components/AttendanceEmptyState.tsx

import { CalendarX } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AttendanceEmptyStateProps {
  onRefresh?: () => void;
}

export function AttendanceEmptyState({
  onRefresh,
}: AttendanceEmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-lg
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <div
        className="
          mb-4
          rounded-full
          bg-slate-100
          p-4
        "
      >
        <CalendarX
          className="
            h-8
            w-8
            text-slate-500
          "
        />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        Belum Ada Riwayat Kehadiran
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-sm
          text-slate-500
        "
      >
        Jamaah ini belum memiliki
        data kehadiran yang tercatat
        pada kegiatan atau kajian
        masjid.
      </p>

      <Button
        className="mt-6"
        variant="outline"
        onClick={onRefresh}
      >
        Muat Ulang
      </Button>
    </div>
  );
}