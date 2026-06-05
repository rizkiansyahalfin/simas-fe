// src/features/congregation-attendance/components/AttendanceTimelineItem.tsx

import { CalendarDays, MapPin } from 'lucide-react';

import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import type { AttendanceRecord } from '../congregationAttendanceTypes';



interface Props {
  record: AttendanceRecord;
}

export function AttendanceTimelineItem({
  record,
}: Props) {
  const formattedDate =
    new Date(record.date).toLocaleDateString(
      'id-ID',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    );

  return (
    <div className="relative pl-8">
      <div
        className="
          absolute
          left-0
          top-1
          h-4
          w-4
          rounded-full
          border-4
          border-white
          bg-emerald-600
          shadow
        "
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              {record.eventName}
            </h4>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {record.location}
              </span>
            </div>

            <div className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {record.category}
            </div>
          </div>

          <AttendanceStatusBadge
            status={record.status}
          />
        </div>
      </div>
    </div>
  );
}