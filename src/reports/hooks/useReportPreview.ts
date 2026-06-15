import { useQuery } from "@tanstack/react-query";

import { reportService } from "../services/reportService";

import type { ReportFilter } from "../report.types";

export function useReportPreview(filter?: ReportFilter) {
  const query = useQuery({
    queryKey: ["report-preview", filter],

    queryFn: () => reportService.getReportPreview(filter!),

    enabled: !!filter,

    staleTime: 1000 * 60 * 5,
  });

  return {
    preview: query.data,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
  };
}