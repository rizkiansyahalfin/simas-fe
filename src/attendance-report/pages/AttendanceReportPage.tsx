import { Separator } from "@/components/ui/separator";


import { AttendanceMonthlyChart } from "../components/AttendanceMonthlyChart";

import { AttendanceTable } from "../components/AttendanceTable";
import { ExportButton } from "../components/ExportButton";

import { useAttendanceReport } from "../hooks/useAttendanceReport";
import { AttendanceSummaryCards } from "../components/AttendanceSummaryCard";
import { AttendanceFilters } from "../components/AttendanceFilter";

export default function AttendanceReportPage() {
  const {
    data,
    chartData,
    summary,
    filters,
    setFilters,
    isLoading,
  } = useAttendanceReport();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Laporan Kehadiran Jamaah
          </h1>

          <p className="mt-1 text-muted-foreground">
            Pantau statistik dan rekap
            kehadiran jamaah berdasarkan
            periode tertentu.
          </p>
        </div>

        <ExportButton data={data} />
      </div>

      <Separator />

      {/* Summary */}

      <AttendanceSummaryCards
        isLoading={isLoading}
        totalMembers={summary.totalMembers}
        totalAttendance={summary.totalAttendance}
        averageAttendance={
          summary.averageAttendance
        }
        mostActiveMember={
          summary.mostActiveMember
        }
      />

      {/* Filters */}

      <AttendanceFilters
        filters={filters}
        onApply={setFilters}
      />

      {/* Chart */}

      <AttendanceMonthlyChart
        data={chartData}
        isLoading={isLoading}
      />

      {/* Table */}

      <AttendanceTable
        data={data}
        isLoading={isLoading}
      />
    </div>
  );
}