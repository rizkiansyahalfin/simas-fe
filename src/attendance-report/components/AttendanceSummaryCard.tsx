import {
  Users,
  CalendarCheck,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AttendanceSummaryCardsProps {
  isLoading: boolean;
  totalMembers: number;
  totalAttendance: number;
  averageAttendance: number;
  mostActiveMember: string;
}

export const AttendanceSummaryCards = ({
  isLoading,
  totalMembers,
  totalAttendance,
  averageAttendance,
  mostActiveMember,
}: AttendanceSummaryCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Jamaah",
      value: totalMembers.toLocaleString(),
      icon: Users,
      description: "Jumlah jamaah terdaftar",
    },
    {
      title: "Total Kehadiran",
      value: totalAttendance.toLocaleString(),
      icon: CalendarCheck,
      description: "Akumulasi seluruh kehadiran",
    },
    {
      title: "Rata-rata Kehadiran",
      value: `${averageAttendance}%`,
      icon: TrendingUp,
      description: "Persentase kehadiran rata-rata",
    },
    {
      title: "Jamaah Teraktif",
      value: mostActiveMember,
      icon: Trophy,
      description: "Kehadiran tertinggi",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="transition-all hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {card.title}
                </span>

                <div className="rounded-lg border p-2">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="truncate text-2xl font-bold">
                  {card.value}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};