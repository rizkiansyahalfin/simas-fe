import { useQuery } from "@tanstack/react-query";

import { reportService } from "../services/reportService";

export function useReportHistory() {
  const query = useQuery({
    queryKey: ["report-history"],
    queryFn: reportService.getReportHistory,
    staleTime: 1000 * 60 * 5,
  });

  return {
    history: query.data?.items ?? [],

    total: query.data?.total ?? 0,

    page: query.data?.page ?? 1,

    pageSize: query.data?.pageSize ?? 10,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
  };
}