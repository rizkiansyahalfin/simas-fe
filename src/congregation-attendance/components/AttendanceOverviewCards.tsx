// src/features/congregation-attendance/components/AttendanceOverviewCards.tsx

import {
  CalendarCheck,
  CalendarDays,
  Percent,
  TrendingUp,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import type { AttendanceOverview } from '../congregationAttendanceTypes';



interface Props {
  overview: AttendanceOverview;
}

export function AttendanceOverviewCards({
  overview,
}: Props) {
  const cards = [
    {
      title: 'Total Kehadiran',
      value: overview.totalAttendance,
      description:
        'Jumlah sesi yang dihadiri',
      icon: CalendarCheck,
    },

    {
      title: 'Total Sesi',
      value: overview.totalSessions,
      description:
        'Total kegiatan tercatat',
      icon: CalendarDays,
    },

    {
      title: 'Persentase Kehadiran',
      value: `${overview.attendancePercentage}%`,
      description:
        'Rasio kehadiran jamaah',
      icon: Percent,
    },

    {
      title: 'Bulan Ini',
      value: overview.attendanceThisMonth,
      description:
        'Kehadiran bulan berjalan',
      icon: TrendingUp,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="
              border-slate-200
              shadow-sm
            "
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    {card.title}
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {card.value}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    {card.description}
                  </p>
                </div>

                <div
                  className="
                    rounded-lg
                    bg-emerald-50
                    p-3
                  "
                >
                  <Icon
                    size={20}
                    className="
                      text-emerald-600
                    "
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}