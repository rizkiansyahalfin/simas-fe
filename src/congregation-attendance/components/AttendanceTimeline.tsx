// src/features/congregation-attendance/components/AttendanceTimeline.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AttendanceTimelineItem } from './AttendanceTimelineItem';
import type { AttendanceRecord } from '../congregationAttendanceTypes';



interface Props {
  records: AttendanceRecord[];
}

export function AttendanceTimeline({
  records,
}: Props) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>
          Timeline Kehadiran
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative ml-2 space-y-6 border-l-2 border-slate-200">
          {records.map((record) => (
            <AttendanceTimelineItem
              key={record.id}
              record={record}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}