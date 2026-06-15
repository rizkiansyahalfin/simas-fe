import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { attendanceReportService } from "../services/attendanceReportService";
import type { AttendanceReportFilters } from "../attendance-report.types";

export const useAttendanceReport = () => {
  const [filters, setFilters] =
    useState<AttendanceReportFilters>({
      status: "Semua",
      search: "",
    });

  const reportQuery = useQuery({
    queryKey: ["attendance-report"],
    queryFn: attendanceReportService.getAttendanceReport,
  });

  const chartQuery = useQuery({
    queryKey: ["attendance-chart"],
    queryFn:
      attendanceReportService.getAttendanceMonthlyStats,
  });

  const filteredData = useMemo(() => {
    const sourceData = reportQuery.data ?? [];

    let result = [...sourceData];

    if (filters.search?.trim()) {
      const keyword = filters.search
        .trim()
        .toLowerCase();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.email.toLowerCase().includes(keyword) ||
          item.memberNumber
            .toLowerCase()
            .includes(keyword)
      );
    }

    switch (filters.status) {
      case "Hadir":
        result = result.filter(
          (item) =>
            item.attendancePercentage >= 70
        );
        break;

      case "Tidak Hadir":
        result = result.filter(
          (item) =>
            item.attendancePercentage < 70
        );
        break;

      default:
        break;
    }

    return result;
  }, [reportQuery.data, filters]);

  const summary = useMemo(() => {
    const totalMembers = filteredData.length;

    const totalAttendance = filteredData.reduce(
      (total, item) =>
        total + item.totalAttendance,
      0
    );

    const averageAttendance =
      totalMembers > 0
        ? Math.round(
            filteredData.reduce(
              (total, item) =>
                total +
                item.attendancePercentage,
              0
            ) / totalMembers
          )
        : 0;

    const mostActiveMember =
      [...filteredData].sort(
        (a, b) =>
          b.attendancePercentage -
          a.attendancePercentage
      )[0]?.name ?? "-";

    return {
      totalMembers,
      totalAttendance,
      averageAttendance,
      mostActiveMember,
    };
  }, [filteredData]);

  return {
    data: filteredData,
    chartData: chartQuery.data ?? [],
    rawData: reportQuery.data ?? [],
    summary,
    isLoading:
      reportQuery.isLoading ||
      chartQuery.isLoading,
    filters,
    setFilters,
  };
};