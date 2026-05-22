import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { History } from "lucide-react";
import { HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Data dummy Mustahik & Riwayat
const DUMMY_MUSTAHIK = [
  { id: "1", nama: "Bapak Fulan", kategori: "Fakir", alamat: "Jl. Mawar RT 01", totalBantuan: 1500000, lastSalur: "2026-05-10" },
  { id: "2", nama: "Ibu Aminah", kategori: "Miskin", alamat: "Jl. Melati RT 03", totalBantuan: 800000, lastSalur: "2026-04-22" },
  { id: "3", nama: "Panti Asuhan Al-Kautsar", kategori: "Fisabilillah", alamat: "Desa Harapan", totalBantuan: 5000000, lastSalur: "2026-05-01" },
  { id: "4", nama: "Bapak Budi", kategori: "Gharimin", alamat: "Jl. Anggrek RT 02", totalBantuan: 2000000, lastSalur: "2026-03-15" },
];

export default function MustahikPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");

  // Filter logika
  const filteredData = DUMMY_MUSTAHIK.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    return matchSearch && matchKategori;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
            <Users className="h-8 w-8 text-simas-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Manajemen Mustahik
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">
              Daftar penerima ZIS, kategori asnaf, dan riwayat penyaluran.
            </p>
          </div>
        </div>
        
        <Button className="h-12 px-6 rounded-xl font-bold bg-simas-primary hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300">
          <Plus className="h-5 w-5 mr-2" /> Tambah Mustahik Baru
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input 
            placeholder="Cari nama mustahik..." 
            className="h-12 pl-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer md:w-64"
          value={kategoriFilter}
          onChange={(e) => setKategoriFilter(e.target.value)}
        >
          <option value="Semua">Semua Kategori Asnaf</option>
          <option value="Fakir">Fakir</option>
          <option value="Miskin">Miskin</option>
          <option value="Gharimin">Gharimin</option>
          <option value="Fisabilillah">Fisabilillah</option>
        </select>
      </div>

      {/* Table Data */}
      <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 md:px-8">Nama Mustahik</th>
                <th className="px-6 py-4">Kategori (Asnaf)</th>
                <th className="px-6 py-4 hidden md:table-cell">Alamat</th>
                <th className="px-6 py-4">Total Bantuan</th>
                <th className="px-6 py-4 md:px-8 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((mustahik) => (
                  <tr key={mustahik.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-5 md:px-8 font-bold text-slate-800 text-base">{mustahik.nama}</td>
                    <td className="px-6 py-5">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        {mustahik.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-medium hidden md:table-cell">{mustahik.alamat}</td>
                    <td className="px-6 py-5">
                      <div className="text-slate-800 font-extrabold flex items-center gap-2 text-base">
                        Rp {mustahik.totalBantuan.toLocaleString('id-ID')}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 mt-1.5 flex items-center gap-1.5">
                        <History className="h-3.5 w-3.5" /> Terakhir: {mustahik.lastSalur}
                      </div>
                    </td>
                    <td className="px-6 py-5 md:px-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* 👇 INI YANG UDAH DIUBAH BRO 👇 - Logika tetap utuh! */}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-10 px-4 rounded-xl border-emerald-200 text-simas-primary font-bold hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm"
                          onClick={() => navigate('/admin/zis/distribusi', { 
                            state: { 
                              namaMustahik: mustahik.nama, 
                              kategoriAsnaf: mustahik.kategori 
                            } 
                          })}
                        >
                          <HeartHandshake className="h-4 w-4 mr-2" /> Salurkan ZIS
                        </Button>
                        {/* 👆 BATAS UBAHAN 👆 */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                      <Users className="w-12 h-12 text-slate-200" />
                      <div>
                        <p className="text-base font-bold text-slate-600">Mustahik Tidak Ditemukan</p>
                        <p className="text-sm font-medium mt-1">Coba sesuaikan kata kunci atau filter pencarian.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}