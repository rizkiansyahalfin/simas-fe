// src/features/congregation-attendance/components/AttendanceStatusBadge.tsx

import { Badge } from '@/components/ui/badge';
import type { AttendanceStatus } from '../congregationAttendanceTypes';



interface Props {
  status: AttendanceStatus;
}

export function AttendanceStatusBadge({
  status,
}: Props) {
  const config = {
    present: {
      label: 'Hadir',
      className:
        'bg-emerald-100 text-emerald-700 border-emerald-200',
    },

    absent: {
      label: 'Tidak Hadir',
      className:
        'bg-red-100 text-red-700 border-red-200',
    },

    excused: {
      label: 'Izin',
      className:
        'bg-amber-100 text-amber-700 border-amber-200',
    },
  };

  const item = config[status];

  return (
    <Badge
      variant="outline"
      className={item.className}
    >
      {item.label}
    </Badge>
  );
}