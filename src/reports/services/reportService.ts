import {
  reportPreviewDummy,
  reportSummaryDummy,
  reportTypes,
} from "../mock/report.mock";

import { reportHistoryDummy } from "../mock/reportHistory.mock";

import type {
  DownloadReportResponse,
  ReportFilter,
  ReportHistoryResponse,
  ReportPreview,
  ReportSummary,
  ReportType,
} from "../report.types";

const sleep = (ms = 500) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

async function getReportTypes(): Promise<ReportType[]> {
  await sleep();

  return reportTypes;
}

async function getReportSummary(): Promise<ReportSummary> {
  await sleep();

  return reportSummaryDummy;
}

async function getReportPreview(
  filter: ReportFilter,
): Promise<ReportPreview> {
  await sleep();

  return {
    ...reportPreviewDummy,

    category: filter.reportType,

    period: filter.period,

    title: `${filter.reportType} Report`,
  };
}

async function getReportHistory(): Promise<ReportHistoryResponse> {
  await sleep();

  return {
    items: reportHistoryDummy,

    total: reportHistoryDummy.length,

    page: 1,

    pageSize: 10,
  };
}

async function downloadReport(
  _filter: ReportFilter,
): Promise<DownloadReportResponse> {
  await sleep(1000);

  return {
    success: true,
  };
}

export const reportService = {
  getReportTypes,
  getReportSummary,
  getReportPreview,
  getReportHistory,
  downloadReport,
};