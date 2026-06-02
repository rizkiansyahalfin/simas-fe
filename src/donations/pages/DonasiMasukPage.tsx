import { useState, useMemo } from "react";
import { Wallet, Building, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DataTable, { type ColumnConfig } from "@/components/DataTable";

// Tipe Data Donasi (Sudah kebal dari error TypeScript)
interface DonationItem {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  method: "Manual Transfer" | "Midtrans";
  status: "Berhasil" | "Menunggu" | "Dibatalkan";
  [key: string]: any; // <--- Ini baris sakti penangkal error-nya
}

// Data Dummy Donasi
const MOCK_DONATIONS: DonationItem[] = [
  { id: "DON-001", donorName: "Hamba Allah", amount: 500000, date: "2026-06-01", method: "Midtrans", status: "Berhasil" },
  { id: "DON-002", donorName: "Bapak Budi Santoso", amount: 1500000, date: "2026-06-01", method: "Manual Transfer", status: "Menunggu" },
  { id: "DON-003", donorName: "Ibu Aminah", amount: 250000, date: "2026-06-02", method: "Midtrans", status: "Berhasil" },
  { id: "DON-004", donorName: "H. Ahmad", amount: 5000000, date: "2026-06-02", method: "Manual Transfer", status: "Berhasil" },
  { id: "DON-005", donorName: "Hamba Allah", amount: 100000, date: "2026-06-02", method: "Midtrans", status: "Dibatalkan" },
];

export default function DonasiMasukPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Manual Transfer" | "Midtrans">("Semua");

  // Helper untuk format Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Hitung-hitungan Rekapitulasi (Hanya yang statusnya "Berhasil")
  const totalKeseluruhan = useMemo(() => 
    MOCK_DONATIONS.filter(d => d.status === "Berhasil").reduce((acc, curr) => acc + curr.amount, 0)
  , []);
  
  const totalManual = useMemo(() => 
    MOCK_DONATIONS.filter(d => d.status === "Berhasil" && d.method === "Manual Transfer").reduce((acc, curr) => acc + curr.amount, 0)
  , []);
  
  const totalMidtrans = useMemo(() => 
    MOCK_DONATIONS.filter(d => d.status === "Berhasil" && d.method === "Midtrans").reduce((acc, curr) => acc + curr.amount, 0)
  , []);

  // Filter tabel berdasarkan Tab aktif
  const filteredDonations = useMemo(() => {
    if (activeTab === "Semua") return MOCK_DONATIONS;
    return MOCK_DONATIONS.filter((d) => d.method === activeTab);
  }, [activeTab]);

  // Konfigurasi Kolom DataTable
  const columns: ColumnConfig<DonationItem>[] = [
    { header: "ID Donasi", accessorKey: "id" },
    { header: "Nama Donatur", accessorKey: "donorName" },
    { header: "Tanggal", accessorKey: "date" },
    { 
      header: "Metode", 
      accessorKey: "method",
      cell: (item) => (
        <span className="font-semibold text-slate-700 flex items-center gap-2">
          {item.method === "Midtrans" ? <CreditCard className="h-4 w-4 text-blue-500" /> : <Building className="h-4 w-4 text-emerald-600" />}
          {item.method}
        </span>
      )
    },
    { 
      header: "Nominal", 
      accessorKey: "amount",
      cell: (item) => <span className="font-bold text-slate-800">{formatRupiah(item.amount)}</span>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => (
        <Badge className={
          item.status === "Berhasil" ? "bg-emerald-100 text-emerald-700" : 
          item.status === "Menunggu" ? "bg-amber-100 text-amber-700" :
          "bg-red-100 text-red-700"
        }>
          {item.status}
        </Badge>
      )
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans space-y-8">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          Dashboard Donasi
        </h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base">
          Pantau seluruh donasi yang masuk, baik via transfer manual maupun otomatis (Midtrans).
        </p>
      </div>

      {/* Kartu Rekapitulasi (Summary Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Total */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 blur-2xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Donasi (Berhasil)</p>
              <h2 className="text-3xl font-extrabold text-slate-800 mt-2">{formatRupiah(totalKeseluruhan)}</h2>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Card Manual */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Manual Transfer</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-2">{formatRupiah(totalManual)}</h2>
            </div>
            <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
              <Building className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Card Midtrans */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Midtrans (Payment Gateway)</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-2">{formatRupiah(totalMidtrans)}</h2>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Area Tabel Data */}
      <div className="space-y-4">
        {/* Custom Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-px">
          {["Semua", "Manual Transfer", "Midtrans"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all ${
                activeTab === tab 
                  ? "bg-white text-emerald-700 border-t border-x border-slate-200 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.02)] -mb-px" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-transparent border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Panggil DataTable Sakti */}
        <DataTable 
          title={`Riwayat Donasi Masuk (${activeTab})`}
          exportFilename={`Laporan_Donasi_${activeTab.replace(" ", "_")}`}
          columns={columns}
          data={filteredDonations}
        />
      </div>

    </div>
  );
}