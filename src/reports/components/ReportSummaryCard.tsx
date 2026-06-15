import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ReportSummaryCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon
  loading?: boolean;
}

export function ReportSummaryCard({
  title,
  value,
  description,
  icon: Icon,
  loading = false,
}: ReportSummaryCardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-start justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="text-3xl font-bold">
            {value}
          </h3>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}