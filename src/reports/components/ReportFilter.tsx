import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { reportTypes } from "../mock/report.mock";
import {
  reportFilterDefaultValues,
  reportFilterSchema,
  type ReportFilterSchema,
} from "../validation/reportFilterSchema";
import type { ReportCategory } from "../report.types";
import { useEffect } from "react";

interface ReportFiltersProps {
  loading?: boolean;
  defaultReportType?: ReportCategory;
  onPreview: (values: ReportFilterSchema) => void;
}

export function ReportFilters({
  loading = false,
  defaultReportType,
  onPreview,
}: ReportFiltersProps) {
  const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  formState: { errors },
} = useForm<ReportFilterSchema>({
    resolver: zodResolver(reportFilterSchema),
    defaultValues: reportFilterDefaultValues,
  })
  useEffect(() => {
  if (defaultReportType) {
    setValue("reportType", defaultReportType);
  }
}, [defaultReportType, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Laporan</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onPreview)}
          className="space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* Jenis Laporan */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Jenis Laporan
              </label>

              <Controller
                control={control}
                name="reportType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih laporan" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ZIS">
                        Laporan ZIS
                      </SelectItem>

                      <SelectItem value="DONATION">
                        Laporan Donasi
                      </SelectItem>

                      <SelectItem value="JAMAAH">
                        Laporan Jamaah
                      </SelectItem>

                      <SelectItem value="INVENTORY">
                        Laporan Inventaris
                      </SelectItem>

                      <SelectItem value="YEARLY">
                        Laporan Tahunan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.reportType && (
                <p className="text-sm text-destructive">
                  {errors.reportType.message}
                </p>
              )}
            </div>

            {/* Periode */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Periode
              </label>

              <Input
                placeholder="Contoh: Juni 2026"
                {...register("period")}
              />

              {errors.period && (
                <p className="text-sm text-destructive">
                  {errors.period.message}
                </p>
              )}
            </div>

            {/* Format */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Format
              </label>

              <Controller
                control={control}
                name="format"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PDF">
                        PDF
                      </SelectItem>

                      <SelectItem value="EXCEL">
                        Excel
                      </SelectItem>

                      <SelectItem value="CSV">
                        CSV
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.format && (
                <p className="text-sm text-destructive">
                  {errors.format.message}
                </p>
              )}
            </div>

            {/* Status */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status
              </label>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ALL">
                        Semua
                      </SelectItem>

                      <SelectItem value="COMPLETED">
                        Selesai
                      </SelectItem>

                      <SelectItem value="DRAFT">
                        Draft
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Tanggal Mulai */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tanggal Mulai
              </label>

              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={
                      field.value
                        ? field.value
                            .toISOString()
                            .substring(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? new Date(e.target.value)
                          : undefined,
                      )
                    }
                  />
                )}
              />

              {errors.startDate && (
                <p className="text-sm text-destructive">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* Tanggal Akhir */}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tanggal Akhir
              </label>

              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={
                      field.value
                        ? field.value
                            .toISOString()
                            .substring(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? new Date(e.target.value)
                          : undefined,
                      )
                    }
                  />
                )}
              />

              {errors.endDate && (
                <p className="text-sm text-destructive">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset(reportFilterDefaultValues)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              <Search className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}