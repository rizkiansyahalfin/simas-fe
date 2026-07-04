export type AttendanceStatus =
  | "Sangat Aktif"
  | "Aktif"
  | "Kurang Aktif";

export interface AttendanceReportItem {
  id: string;
  memberNumber: string;
  name: string;
  email: string;
  totalAttendance: number;
  totalAbsent: number;
  attendancePercentage: number;
  status: AttendanceStatus;
}

export interface AttendanceMonthlyData {
  month: string;
  totalAttendance: number;
}

export interface AttendanceReportFilters {
  dateFrom?: string;
  dateTo?: string;
  status?: "Semua" | "Hadir" | "Tidak Hadir";
  search?: string;
}

export interface AttendanceSummary {
  totalMembers: number;
  totalAttendance: number;
  averageAttendance: number;
  mostActiveMember: string;
}