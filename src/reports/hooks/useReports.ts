import { useQuery } from "@tanstack/react-query";

import { reportService } from "../services/reportService";

export function useReports() {
  const reportTypesQuery = useQuery({
    queryKey: ["report-types"],
    queryFn: reportService.getReportTypes,
  });

  const summaryQuery = useQuery({
    queryKey: ["report-summary"],
    queryFn: reportService.getReportSummary,
  });

  return {
    reportTypes: reportTypesQuery.data ?? [],

    summary: summaryQuery.data,

    isLoading:
      reportTypesQuery.isLoading ||
      summaryQuery.isLoading,

    isFetching:
      reportTypesQuery.isFetching ||
      summaryQuery.isFetching,

    isError:
      reportTypesQuery.isError ||
      summaryQuery.isError,

    refetch: async () => {
      await Promise.all([
        reportTypesQuery.refetch(),
        summaryQuery.refetch(),
      ]);
    },
  };
}