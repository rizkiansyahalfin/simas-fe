// src/features/congregation-attendance/components/AttendanceProgressCard.tsx

import { CheckCircle2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';



interface AttendanceProgressCardProps {
  totalAttendance: number;
  totalSessions: number;
  percentage: number;
}

export function AttendanceProgressCard({
  totalAttendance,
  totalSessions,
  percentage,
}: AttendanceProgressCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Persentase Kehadiran
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Tingkat Kehadiran
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              {percentage}%
            </h3>
          </div>

          <div className="rounded-lg bg-emerald-50 px-3 py-2">
            <span className="text-sm font-medium text-emerald-700">
              Sangat Baik
            </span>
          </div>
        </div>

        <progress
          value={percentage}
          className="h-3"
        />

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">
            Hadir {totalAttendance} dari{' '}
            {totalSessions} sesi
          </span>

          <span className="font-medium text-emerald-700">
            {percentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}