// src/features/congregation-attendance/hooks/useCongregationAttendance.ts

import { useQuery } from '@tanstack/react-query';

import { attendanceService } from '../services/attendanceService';

export const useCongregationAttendance = (
  congregationId: string,
) => {
  return useQuery({
    queryKey: [
      'congregation-attendance',
      congregationId,
    ],

    queryFn: () =>
      attendanceService.getCongregationAttendance(
        congregationId,
      ),

    staleTime: 1000 * 60 * 5,
  });
};