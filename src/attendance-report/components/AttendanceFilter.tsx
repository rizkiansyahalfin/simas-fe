import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { AttendanceReportFilters } from "../attendance-report.types";

const ATTENDANCE_STATUS = [
  "Semua",
  "Hadir",
  "Tidak Hadir",
] as const;

const filterSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(ATTENDANCE_STATUS).optional(),
  search: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface AttendanceFiltersProps {
  filters: AttendanceReportFilters;
  onApply: (filters: AttendanceReportFilters) => void;
}

const DEFAULT_FILTERS: AttendanceReportFilters = {
  dateFrom: "",
  dateTo: "",
  status: "Semua",
  search: "",
};

export const AttendanceFilters = ({
  filters,
  onApply,
}: AttendanceFiltersProps) => {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      ...DEFAULT_FILTERS,
      ...filters,
    },
  });

  useEffect(() => {
    form.reset({
      ...DEFAULT_FILTERS,
      ...filters,
    });
  }, [filters, form]);

  const handleSubmit = (
    values: FilterFormValues
  ) => {
    onApply({
      ...DEFAULT_FILTERS,
      ...values,
    });
  };

  const handleReset = () => {
    form.reset(DEFAULT_FILTERS);
    onApply(DEFAULT_FILTERS);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4"
        >
          <div className="grid gap-4 lg:grid-cols-4">
            <Input
              type="date"
              {...form.register("dateFrom")}
            />

            <Input
              type="date"
              {...form.register("dateTo")}
            />

            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue(
                  "status",
                  value as FilterFormValues["status"]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status Kehadiran" />
              </SelectTrigger>

              <SelectContent>
                {ATTENDANCE_STATUS.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Cari nama, email, nomor anggota..."
              {...form.register("search")}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit">
              Terapkan Filter
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset Filter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};