// src/features/congregation-attendance/services/attendanceService.ts

import type { AttendanceResponse } from "../congregationAttendanceTypes";


export const attendanceService = {
  async getCongregationAttendance(
    congregationId: string,
  ): Promise<AttendanceResponse> {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    return {
      overview: {
        totalAttendance: 34,
        totalSessions: 40,
        attendancePercentage: 85,
        attendanceThisMonth: 4,
      },

      records: [
        {
          id: '1',
          eventName: 'Kajian Tafsir',
          category: 'Kajian',
          location: 'Masjid Al-Hikmah',
          date: '2026-01-12',
          status: 'present',
        },
        {
          id: '2',
          eventName: 'Kajian Hadits',
          category: 'Kajian',
          location: 'Masjid Al-Hikmah',
          date: '2026-01-19',
          status: 'present',
        },
        {
          id: '3',
          eventName: 'Majelis Taklim',
          category: 'Taklim',
          location: 'Aula Masjid',
          date: '2026-01-26',
          status: 'excused',
        },
        {
          id: '4',
          eventName: 'Kajian Fiqih',
          category: 'Kajian',
          location: 'Masjid Al-Hikmah',
          date: '2026-02-02',
          status: 'absent',
        },
        {
          id: '5',
          eventName: 'Kajian Akhlak',
          category: 'Kajian',
          location: 'Masjid Al-Hikmah',
          date: '2026-02-09',
          status: 'present',
        },
      ],
    };
  },
};