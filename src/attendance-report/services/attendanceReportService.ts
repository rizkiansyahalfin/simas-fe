import {
  attendanceMockData,
  monthlyAttendanceMock,
} from "../mock/attendance.mock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const attendanceReportService = {
  async getAttendanceReport() {
    await delay(800);

    return attendanceMockData;
  },

  async getAttendanceMonthlyStats() {
    await delay(800);

    return monthlyAttendanceMock;
  },
};