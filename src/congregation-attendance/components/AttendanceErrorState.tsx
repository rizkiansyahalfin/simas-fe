// src/features/congregation-attendance/components/AttendanceErrorState.tsx

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AttendanceErrorStateProps {
  onRetry: () => void;
}

export function AttendanceErrorState({
  onRetry,
}: AttendanceErrorStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-lg
        border
        border-red-200
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
          bg-red-100
          p-4
        "
      >
        <AlertTriangle
          className="
            h-8
            w-8
            text-red-600
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
        Gagal Memuat Data Kehadiran
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-sm
          text-slate-500
        "
      >
        Terjadi kesalahan saat
        mengambil riwayat kehadiran
        jamaah. Silakan coba lagi.
      </p>

      <Button
        className="mt-6"
        onClick={onRetry}
      >
        Coba Lagi
      </Button>
    </div>
  );
}