import {
  Boxes,
  CalendarDays,
  HeartHandshake,
  Users,
  Wallet,
} from "lucide-react";
import type { ReportPreview, ReportSummary, ReportType } from "../report.types";



/* ==========================================================
 * REPORT TYPES
 * ========================================================== */

export const reportTypes: ReportType[] = [
  {
    id: "zis",
    name: "Laporan ZIS",
    description: "Rekap zakat, infak, dan sedekah.",
    icon: Wallet,
    color: "emerald",
  },
  {
    id: "donation",
    name: "Laporan Donasi",
    description: "Rekap seluruh transaksi donasi.",
    icon: HeartHandshake,
    color: "blue",
  },
  {
    id: "jamaah",
    name: "Laporan Jamaah",
    description: "Data jamaah aktif dan statistik.",
    icon: Users,
    color: "orange",
  },
  {
    id: "inventory",
    name: "Laporan Inventaris",
    description: "Rekap inventaris masjid.",
    icon: Boxes,
    color: "purple",
  },
  {
    id: "yearly",
    name: "Laporan Tahunan",
    description: "Ringkasan laporan tahunan.",
    icon: CalendarDays,
    color: "rose",
  },
];

/* ==========================================================
 * SUMMARY
 * ========================================================== */

export const reportSummaryDummy: ReportSummary = {
  totalDownloads: 1248,
  todayDownloads: 18,
  monthlyDownloads: 236,
  reportTypes: reportTypes.length,
};

/* ==========================================================
 * PREVIEW
 * ========================================================== */

export const reportPreviewDummy: ReportPreview = {
  id: "preview-001",

  title: "Laporan ZIS Juni 2026",

  category: "ZIS",

  period: "Juni 2026",

  createdAt: "2026-06-15",

  estimatedSize: "1.8 MB",

  totalRows: 128,

  headers: [
    "Nama",
    "Tanggal",
    "Kategori",
    "Nominal",
    "Status",
  ],

  rows: [
    {
      Nama: "Ahmad Fauzi",
      Tanggal: "2026-06-01",
      Kategori: "Zakat",
      Nominal: "Rp250.000",
      Status: "Selesai",
    },
    {
      Nama: "Budi Santoso",
      Tanggal: "2026-06-02",
      Kategori: "Infak",
      Nominal: "Rp150.000",
      Status: "Selesai",
    },
    {
      Nama: "Siti Rahma",
      Tanggal: "2026-06-03",
      Kategori: "Sedekah",
      Nominal: "Rp75.000",
      Status: "Draft",
    },
    {
      Nama: "Dewi Lestari",
      Tanggal: "2026-06-04",
      Kategori: "Infak",
      Nominal: "Rp500.000",
      Status: "Selesai",
    },
    {
      Nama: "Andi Wijaya",
      Tanggal: "2026-06-05",
      Kategori: "Zakat",
      Nominal: "Rp300.000",
      Status: "Selesai",
    },
  ],
};