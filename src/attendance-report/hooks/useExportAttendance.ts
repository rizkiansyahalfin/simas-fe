import * as XLSX from "xlsx";
import type { AttendanceReportItem } from "../attendance-report.types";



export const useExportAttendance = () => {
  const exportAttendance = (
    data: AttendanceReportItem[]
  ) => {
    const rows = data.map((item) => ({
      Nama: item.name,
      Email: item.email,
      "Total Hadir": item.totalAttendance,
      "Total Tidak Hadir": item.totalAbsent,
      Persentase: `${item.attendancePercentage}%`,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance Report"
    );

    const date = new Date()
      .toISOString()
      .split("T")[0];

    XLSX.writeFile(
      workbook,
      `attendance-report-${date}.xlsx`
    );
  };

  return {
    exportAttendance,
  };
};