// src/features/congregation-attendance/tabs/CongregationAttendanceTab.tsx

import {
  AttendanceOverviewCards,
} from '../components/AttendanceOverviewCards';

import {
  AttendanceProgressCard,
} from '../components/AttendanceProgressCard';

import {
  AttendanceTimeline,
} from '../components/AttendanceTimeline';

import {
  AttendanceTrendChart,
} from '../components/AttendanceTrendChart';

import {
  AttendanceTable,
} from '../components/AttendanceTable';

import {
  AttendanceSkeleton,
} from '../components/AttendanceSkeleton';

import {
  AttendanceErrorState,
} from '../components/AttendanceErrorState';

import {
  AttendanceEmptyState,
} from '../components/AttendanceEmptyState';

import {
  useCongregationAttendance,
} from '../hooks/useCongregationAttendance';

interface Props {
  congregationId: string;
}

export function CongregationAttendanceTab({
  congregationId,
}: Props) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } =
    useCongregationAttendance(
      congregationId,
    );

  if (isLoading) {
    return <AttendanceSkeleton />;
  }

  if (isError) {
    return (
      <AttendanceErrorState
        onRetry={() => refetch()}
      />
    );
  }

  if (
    !data ||
    data.records.length === 0
  ) {
    return (
      <AttendanceEmptyState
        onRefresh={() =>
          refetch()
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <AttendanceOverviewCards
        overview={data.overview}
      />

      <AttendanceProgressCard
        totalAttendance={
          data.overview
            .totalAttendance
        }
        totalSessions={
          data.overview.totalSessions
        }
        percentage={
          data.overview
            .attendancePercentage
        }
      />

      <AttendanceTrendChart />

      <AttendanceTimeline
        records={data.records}
      />

      <AttendanceTable
        records={data.records}
      />
    </div>
  );
}