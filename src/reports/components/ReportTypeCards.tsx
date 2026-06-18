import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import type { ReportType } from "../report.types";

interface Props {
  items: ReportType[];
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
}

export function ReportTypeCards({
  items,
  value,
  loading = false,
  onChange,
}: Props) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => {
        const selected = value === item.id;
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onChange(item.id);
              }
            }}
            className={[
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selected
                ? "border-green-500 ring-2 ring-green-200"
                : "",
            ].join(" ")}
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                {selected && (
                  <Check className="h-5 w-5 text-green-600" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}