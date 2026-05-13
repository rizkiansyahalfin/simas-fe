import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Archive } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InventoryForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk nyimpen isian form
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    kategori: "Perlengkapan",
    jumlah: "",
    kondisi: "Baik"
  });

  // Fungsi buat nanganin perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi pas tombol simpan diklik
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading nyimpen data ke backend
    setTimeout(() => {
      setIsLoading(false);
      alert("Data inventaris berhasil disimpan!");
      navigate(-1); // Balik ke halaman sebelumnya setelah simpan
    }, 1000);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto font-sans">
      
      {/* Tombol Kembali (Ghost) */}
      <Button 
        variant="ghost" 
        className="mb-6 md:mb-8 hover:bg-emerald-50 hover:text-simas-primary transition-colors text-slate-500 font-medium -ml-2 rounded-xl px-4 h-10"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
      </Button>

      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
          <Archive className="h-8 w-8 text-simas-primary" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Form Inventaris Barang
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
            Tambah data aset baru atau edit informasi barang yang sudah ada.
          </p>
        </div>
      </div>

      {/* Card Form Premium */}
      <div className="bg-white p-6 sm:p-10 md:p-12 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        
        {/* Dekorasi Background Halus di dalam Card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Kode Barang */}
            <div className="space-y-3">
              <Label htmlFor="kode" className="text-slate-700 font-bold text-base">Kode Barang</Label>
              <Input 
                id="kode" 
                name="kode"
                placeholder="Contoh: INV-2026-001" 
                value={formData.kode}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
                required 
              />
            </div>

            {/* Input Nama Barang */}
            <div className="space-y-3">
              <Label htmlFor="nama" className="text-slate-700 font-bold text-base">Nama Barang</Label>
              <Input 
                id="nama" 
                name="nama"
                placeholder="Contoh: Karpet Shaf Utama" 
                value={formData.nama}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
                required 
              />
            </div>

            {/* Input Kategori (Dropdown) */}
            <div className="space-y-3">
              <Label htmlFor="kategori" className="text-slate-700 font-bold text-base">Kategori</Label>
              <select 
                id="kategori" 
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer"
              >
                <option value="Perlengkapan">Perlengkapan</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Furniture">Furniture</option>
                <option value="Pustaka">Pustaka</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Jumlah */}
            <div className="space-y-3">
              <Label htmlFor="jumlah" className="text-slate-700 font-bold text-base">Jumlah Barang (Qty)</Label>
              <Input 
                id="jumlah" 
                name="jumlah"
                type="number" 
                placeholder="Contoh: 10" 
                min="1"
                value={formData.jumlah}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
                required 
              />
            </div>

            {/* Input Kondisi (Dropdown) */}
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="kondisi" className="text-slate-700 font-bold text-base">Kondisi Barang</Label>
              <select 
                id="kondisi" 
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
                className="flex h-12 w-full md:w-1/2 rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer"
              >
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="h-12 px-8 rounded-xl font-bold text-base border-slate-200 hover:bg-slate-50 text-slate-600 transition-all w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              className="h-12 w-full sm:w-auto bg-simas-primary hover:bg-emerald-700 text-white px-10 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              disabled={isLoading}
            >
              <Save className="mr-2.5 h-5 w-5" />
              {isLoading ? "Menyimpan Data..." : "Simpan Data"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
