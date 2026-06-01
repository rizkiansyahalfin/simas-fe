import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DataTable, { type ColumnConfig } from "@/components/DataTable";

// Tipe Data untuk Riwayat Peminjaman
interface LoanHistory {
  id: string;
  itemName: string;
  borrower: string;
  dateBorrowed: string;
  dateReturned: string | null;
  quantity: number;
  conditionReturned: "Baik" | "Rusak" | "Hilang" | "-";
  status: "Dipinjam" | "Dikembalikan";
}

// Data Dummy
const MOCK_LOANS: LoanHistory[] = [
  { id: "TRX-001", itemName: "Speaker Aktif Yamaha", borrower: "Ust. Fulan (Kajian)", dateBorrowed: "2026-05-10", dateReturned: "2026-05-11", quantity: 2, conditionReturned: "Baik", status: "Dikembalikan" },
  { id: "TRX-002", itemName: "Karpet Shalat", borrower: "Panitia Tabligh Akbar", dateBorrowed: "2026-05-25", dateReturned: null, quantity: 10, conditionReturned: "-", status: "Dipinjam" },
  { id: "TRX-003", itemName: "Proyektor Epson", borrower: "Remas (Rapat)", dateBorrowed: "2026-05-28", dateReturned: "2026-05-28", quantity: 1, conditionReturned: "Rusak", status: "Dikembalikan" },
  { id: "TRX-004", itemName: "Kipas Angin Portabel", borrower: "Ibu-ibu PKK", dateBorrowed: "2026-05-29", dateReturned: null, quantity: 3, conditionReturned: "-", status: "Dipinjam" },
];

export default function InventoryLoansPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Dipinjam" | "Dikembalikan">("Semua");

  // Filter data berdasarkan Tab yang diklik
  const filteredLoans = MOCK_LOANS.filter(loan => {
    if (activeTab === "Semua") return true;
    return loan.status === activeTab;
  });

  // Konfigurasi Kolom DataTable
  const columns: ColumnConfig<LoanHistory>[] = [
    { header: "ID Transaksi", accessorKey: "id" },
    { header: "Nama Barang", accessorKey: "itemName" },
    { header: "Peminjam", accessorKey: "borrower" },
    { header: "Tgl Pinjam", accessorKey: "dateBorrowed" },
    { 
      header: "Tgl Kembali", 
      accessorKey: "dateReturned",
      cell: (item) => item.dateReturned ? item.dateReturned : <span className="text-slate-400 italic">Belum kembali</span>
    },
    { header: "Qty", accessorKey: "quantity" },
    {
      header: "Kondisi Kembali",
      accessorKey: "conditionReturned",
      cell: (item) => (
        <Badge className={
          item.conditionReturned === "Baik" ? "bg-emerald-100 text-emerald-700" : 
          item.conditionReturned === "Rusak" ? "bg-amber-100 text-amber-700" :
          item.conditionReturned === "Hilang" ? "bg-red-100 text-red-700" :
          "bg-slate-100 text-slate-500"
        }>
          {item.conditionReturned}
        </Badge>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => (
        <Badge className={item.status === "Dipinjam" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}>
          {item.status}
        </Badge>
      )
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
          <PackageSearch className="h-8 w-8 text-simas-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Riwayat Peminjaman Barang
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            Pantau siapa saja yang meminjam inventaris masjid dan cek kondisi saat barang dikembalikan.
          </p>
        </div>
      </div>

      {/* Custom Tabs (Semua | Dipinjam | Dikembalikan) */}
      <div className="flex gap-2 border-b border-slate-200 pb-px">
        {["Semua", "Dipinjam", "Dikembalikan"].map((tab) => (
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
        title={`Tabel Peminjaman (${activeTab})`}
        exportFilename={`Laporan_Peminjaman_${activeTab}`}
        columns={columns}
        data={filteredLoans}
      />
      
    </div>
  );
}