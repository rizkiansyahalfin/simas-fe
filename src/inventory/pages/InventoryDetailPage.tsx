import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package, List, Clock, User, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data Dummy Inventaris
const MOCK_INVENTORY = {
  id: "INV-001",
  name: "Sound System / Speaker Aktif Yamaha",
  category: "Elektronik & Sound",
  totalQty: 4,
  availableQty: 2,
  condition: "Baik",
  purchaseDate: "2023-08-15",
  location: "Gudang Utama",
  description: "Speaker aktif Yamaha DBR15 1000W 15-inch Powered Speaker. Digunakan untuk keperluan kajian akbar, shalat Jumat, dan acara besar di halaman masjid.",
  image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop",
};

// Data Dummy Riwayat Peminjaman
const MOCK_LOANS = [
  { id: 1, borrower: "Ust. Fulan (Kajian Subuh)", dateOut: "2024-03-05", dateIn: "2024-03-05", status: "Dikembalikan", qty: 2 },
  { id: 2, borrower: "Panitia Maulid Remaja", dateOut: "2024-02-28", dateIn: "2024-03-01", status: "Dikembalikan", qty: 4 },
  { id: 3, borrower: "Pengajian Ibu-ibu PKK", dateOut: "2024-05-24", dateIn: "-", status: "Dipinjam", qty: 2 },
];

// Data Dummy Riwayat Kondisi
const MOCK_CONDITIONS = [
  { id: 1, date: "2024-01-10", oldStatus: "Sangat Baik", newStatus: "Baik", note: "Ada lecet sedikit di bagian casing belakang", user: "Admin SIMAS" },
  { id: 2, date: "2023-08-15", oldStatus: "-", newStatus: "Sangat Baik", note: "Barang baru dibeli dari toko resmi", user: "Bendahara" },
];

export default function InventoryDetailPage() {
  useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Tombol Kembali */}
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-emerald-50 hover:text-simas-primary transition-colors text-slate-500 font-medium -ml-2 rounded-xl px-4 h-10"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Inventaris
      </Button>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
            <Package className="h-8 w-8 text-simas-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">
              Detail Barang
            </h1>
            <p className="text-slate-500 font-medium text-sm sm:text-base">
              SKU: <span className="font-bold text-slate-700">{MOCK_INVENTORY.id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KOLOM KIRI: Foto & Info Utama */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <div className="aspect-square bg-slate-100 relative">
              <img 
                src={MOCK_INVENTORY.image} 
                alt={MOCK_INVENTORY.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/800x800/059669/ffffff?text=No+Image`;
                }}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-sm font-bold text-emerald-700 shadow-sm border border-emerald-100">
                {MOCK_INVENTORY.condition}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                {MOCK_INVENTORY.name}
              </h2>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                <List className="h-4 w-4" /> {MOCK_INVENTORY.category}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Tersedia</p>
                  <p className="text-2xl font-extrabold text-emerald-600">{MOCK_INVENTORY.availableQty} <span className="text-sm text-slate-500 font-medium">/ {MOCK_INVENTORY.totalQty} unit</span></p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Lokasi</p>
                  <p className="font-semibold text-slate-800">{MOCK_INVENTORY.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Spesifikasi & Riwayat */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Spesifikasi / Deskripsi */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <List className="h-5 w-5 text-emerald-600" /> Spesifikasi Lengkap
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {MOCK_INVENTORY.description}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" /> Tanggal Pengadaan: <span className="font-semibold text-slate-700">{MOCK_INVENTORY.purchaseDate}</span>
            </div>
          </div>

          {/* Riwayat Peminjaman (Tabel) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" /> Riwayat Peminjaman
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Peminjam</th>
                    <th className="px-4 py-3">Tgl Pinjam</th>
                    <th className="px-4 py-3">Tgl Kembali</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_LOANS.map((loan) => (
                    <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 font-semibold text-slate-800">{loan.borrower}</td>
                      <td className="px-4 py-4">{loan.dateOut}</td>
                      <td className="px-4 py-4">{loan.dateIn}</td>
                      <td className="px-4 py-4">{loan.qty} unit</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${loan.status === 'Dipinjam' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Riwayat Kondisi (List / Timeline) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-emerald-600" /> Riwayat Perubahan Kondisi
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {MOCK_CONDITIONS.map((cond) => (
                <div key={cond.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-emerald-50 text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{cond.newStatus}</span>
                      <span className="text-xs font-medium text-slate-400">{cond.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{cond.note}</p>
                    <p className="text-xs font-medium text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">Oleh: {cond.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}