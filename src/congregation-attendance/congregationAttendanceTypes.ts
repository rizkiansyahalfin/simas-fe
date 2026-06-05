// src/features/congregation-attendance/types.ts

export type AttendanceStatus =
  | 'present'
  | 'absent'
  | 'excused';

export interface AttendanceRecord {
  id: string;
  eventName: string;
  category: string;
  location: string;
  date: string;
  status: AttendanceStatus;
}

export interface AttendanceOverview {
  totalAttendance: number;
  totalSessions: number;
  attendancePercentage: number;
  attendanceThisMonth: number;
}

export interface AttendanceResponse {
  overview: AttendanceOverview;
  records: AttendanceRecord[];
}