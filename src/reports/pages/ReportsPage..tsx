import { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  FileText,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { ReportFilters } from "../components/ReportFilter";
import { ReportHistoryTable } from "../components/ReportHistoryTable";
import { ReportPreviewDialog } from "../components/ReportPreviewDialog";
import { ReportSummaryCard } from "../components/ReportSummaryCard";
import { ReportTypeCards } from "../components/ReportTypeCards";

import { useReportHistory } from "../hooks/useReportHistory";
import { useReportPreview } from "../hooks/useReportPreview";
import { useReports } from "../hooks/useReports";

import type {
  ReportCategory,
  ReportFilter,
  ReportHistory,
  ReportSummary,
} from "../report.types";



export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] =
    useState("");

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [reportFilter, setReportFilter] =
    useState<ReportFilter>();

  /*
   * Queries
   */

  const {
    reportTypes,
    summary,
    isLoading,
  } = useReports();

  const {
    history,
    isLoading: historyLoading,
  } = useReportHistory();

  const {
    preview,
    isLoading: previewLoading,
  } = useReportPreview(reportFilter);

  /*
   * Summary Cards
   */

  const summaryCards = useMemo(() => {
    if (!summary) return [];

    const data: Array<{
      title: string;
      value: number;
      description: string;
      icon: LucideIcon;
    }> = [
      {
        title: "Total Download",
        value: summary.totalDownloads,
        description: "Seluruh download laporan",
        icon: Download,
      },
      {
        title: "Hari Ini",
        value: summary.todayDownloads,
        description: "Download hari ini",
        icon: CalendarDays,
      },
      {
        title: "Laporan Bulan Ini",
        value: summary.monthlyDownloads,
        description: "Download bulan ini",
        icon: FileText,
      },
      {
        title: "Jenis Laporan",
        value: summary.reportTypes,
        description: "Jenis laporan tersedia",
        icon: FolderKanban,
      },
    ];

    return data;
  }, [summary]);

  /*
   * Event Handler
   */

  const handlePreview = (
    values: ReportFilter,
  ) => {
    setReportFilter(values);

    setPreviewOpen(true);
  };

  const handleDownload = async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    toast.success("Laporan berhasil diunduh.");
  };

  const handleViewHistory = (
  item: ReportHistory,
) => {
  console.log(item);
};

  const handleDownloadAgain = (
    item: ReportHistory,
  ) => {
    console.log("Download Again", item);

    toast.success("Download dimulai.");
  };

  const handleDeleteHistory = (
    item: ReportHistory,
  ) => {
    console.log("Delete", item);

    toast.success("Riwayat berhasil dihapus.");
  };

  

  return (
    <div className="space-y-8 p-6">

      {/* =======================================================
          HEADER
      ======================================================== */}

      <div className="space-y-2">

        <h1 className="text-3xl font-bold tracking-tight">
          Laporan
        </h1>

        <p className="text-muted-foreground">
          Kelola dan unduh berbagai laporan
          operasional masjid.
        </p>

      </div>

      {/* =======================================================
          SUMMARY
      ======================================================== */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {summaryCards.map((card) => (
          <ReportSummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            loading={isLoading}
          />
        ))}

      </section>
            {/* =======================================================
          REPORT TYPE
      ======================================================== */}

      <section className="space-y-4">

        <div>
          <h2 className="text-lg font-semibold">
            Jenis Laporan
          </h2>

          <p className="text-sm text-muted-foreground">
            Pilih jenis laporan yang ingin dibuat.
          </p>
        </div>

        <ReportTypeCards
        items={reportTypes}
        value={selectedReportType}
        loading={isLoading}
        onChange={setSelectedReportType}
      />

      </section>

      {/* =======================================================
          FILTER
      ======================================================== */}

      <section className="space-y-4">

        <div>
          <h2 className="text-lg font-semibold">
            Filter Laporan
          </h2>

          <p className="text-sm text-muted-foreground">
            Tentukan periode, format, dan status laporan.
          </p>
        </div>

        <ReportFilters
          loading={previewLoading}
          defaultReportType={selectedReportType as ReportCategory}
          onPreview={handlePreview}
        />

      </section>

      {/* =======================================================
          HISTORY
      ======================================================== */}

      <section className="space-y-4">

        <div>
          <h2 className="text-lg font-semibold">
            Riwayat Download
          </h2>

          <p className="text-sm text-muted-foreground">
            Daftar laporan yang pernah diunduh.
          </p>
        </div>

        <ReportHistoryTable
          history={history}
          loading={historyLoading}
          onView={handleViewHistory}
          onDownload={handleDownloadAgain}
          onDelete={handleDeleteHistory}
        />

      </section>

      {/* =======================================================
          PREVIEW DIALOG
      ======================================================== */}

      <ReportPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        loading={previewLoading}
        preview={preview}
        filter={reportFilter}
        onDownload={handleDownload}
      />
            <ReportPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        loading={previewLoading}
        preview={preview}
        filter={reportFilter}
        onDownload={handleDownload}
      />
    </div>
  );
}