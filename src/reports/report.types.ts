import type { LucideIcon } from "lucide-react";

/* ==========================================================
 * CONSTANTS
 * ========================================================== */

export const REPORT_FORMATS = [
  "PDF",
  "EXCEL",
  "CSV",
] as const;

export const REPORT_STATUS = [
  "ALL",
  "DRAFT",
  "COMPLETED",
] as const;

export const REPORT_CATEGORIES = [
  "ZIS",
  "DONATION",
  "JAMAAH",
  "INVENTORY",
  "YEARLY",
] as const;

export const HISTORY_STATUS = [
  "Completed",
  "Draft",
] as const;

/* ==========================================================
 * TYPES
 * ========================================================== */

export type ReportFormat = (typeof REPORT_FORMATS)[number];

export type ReportStatus = (typeof REPORT_STATUS)[number];

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export type HistoryStatus = (typeof HISTORY_STATUS)[number];

/* ==========================================================
 * REPORT TYPE
 * ========================================================== */

export interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

/* ==========================================================
 * REPORT FILTER
 * ========================================================== */

export interface ReportFilter {
  reportType: ReportCategory;

  period: string;

  startDate?: Date;

  endDate?: Date;

  format: ReportFormat;

  status: ReportStatus;
}

/* ==========================================================
 * REPORT PREVIEW
 * ========================================================== */

export interface ReportPreviewRow {
  Nama: string;
  Tanggal: string;
  Kategori: string;
  Nominal: string;
  Status: string;
}

export interface ReportPreview {
  id: string;

  title: string;

  category: ReportCategory;

  period: string;

  createdAt: string;

  estimatedSize: string;

  totalRows: number;

  headers: string[];

  rows: ReportPreviewRow[];
}

/* ==========================================================
 * REPORT HISTORY
 * ========================================================== */

export interface ReportHistory {
  id: string;

  downloadedAt: string;

  reportName: string;

  category: ReportCategory;

  format: ReportFormat;

  size: string;

  downloadedBy: string;

  status: HistoryStatus;
}

/* ==========================================================
 * REPORT SUMMARY
 * ========================================================== */

export interface ReportSummary {
  totalDownloads: number;

  todayDownloads: number;

  monthlyDownloads: number;

  reportTypes: number;
}

/* ==========================================================
 * SERVICE RESPONSE
 * ========================================================== */

export interface DownloadReportResponse {
  success: boolean;
}

export interface ReportHistoryResponse {
  items: ReportHistory[];

  total: number;

  page: number;

  pageSize: number;
}