import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Box, FileText, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InventoryForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // State Error
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "Elektronik",
    jumlah: "",
    kondisi: "Baik",
    keterangan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error kalau user ngetik lagi
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.nama_barang.trim()) {
      newErrors.nama_barang = "Nama barang wajib diisi.";
    }
    
    if (!formData.jumlah) {
      newErrors.jumlah = "Jumlah barang harus diisi.";
    } else if (parseInt(formData.jumlah) <= 0) {
      newErrors.jumlah = "Jumlah barang minimal 1.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulasi API Backend
    setTimeout(() => {
      setIsLoading(false);

      // Simulasi Server Validation: Nolak barang tertentu
      if (formData.nama_barang.toLowerCase().includes("senjata")) {
        setServerError("SERVER ERROR: Kategori barang ini dilarang masuk ke dalam inventaris masjid.");
        return;
      }

      alert("Barang berhasil ditambahkan ke inventaris!");
      navigate(-1); 
    }, 1500);
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
          <Box className="h-8 w-8 text-simas-primary" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Form Tambah Inventaris
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
            Catat aset dan barang masjid dengan validasi data yang ketat.
          </p>
        </div>
      </div>

      {/* Alert Error Server */}
      {serverError && (
        <div className="mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl text-sm md:text-base font-bold text-red-700 bg-red-50 border-2 border-red-200/60 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <AlertCircle className="h-6 w-6 shrink-0 text-red-500" />
          <p>{serverError}</p>
        </div>
      )}

      {/* Card Form Premium */}
      <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        
        {/* Dekorasi Background Halus di dalam Card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Nama Barang dengan Error State */}
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="nama_barang" className={`font-bold text-base ${errors.nama_barang ? "text-red-600" : "text-slate-700"}`}>
                Nama Barang
              </Label>
              <Input 
                id="nama_barang" 
                name="nama_barang"
                placeholder="Contoh: AC Daikin 1 PK / Sajadah Karpet" 
                value={formData.nama_barang} 
                onChange={handleChange}
                className={`h-12 rounded-xl bg-slate-50/50 transition-all text-base text-slate-800 font-medium ${
                  errors.nama_barang 
                    ? "border-red-300 focus-visible:ring-red-200 focus-visible:border-red-500" 
                    : "border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary"
                }`}
              />
              {errors.nama_barang && (
                <p className="text-sm text-red-500 font-bold flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-4 w-4" /> {errors.nama_barang}
                </p>
              )}
            </div>

            {/* Input Kategori (Dropdown) */}
            <div className="space-y-3">
              <Label htmlFor="kategori" className="text-slate-700 font-bold text-base">Kategori Barang</Label>
              <select 
                id="kategori" 
                name="kategori"
                value={formData.kategori} 
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer"
              >
                <option value="Elektronik">Elektronik</option>
                <option value="Furnitur">Furnitur</option>
                <option value="Perlengkapan Ibadah">Perlengkapan Ibadah</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Jumlah dengan Error State */}
            <div className="space-y-3">
              <Label htmlFor="jumlah" className={`font-bold text-base ${errors.jumlah ? "text-red-600" : "text-slate-700"}`}>
                Jumlah / Kuantitas
              </Label>
              <Input 
                id="jumlah" 
                name="jumlah" 
                type="number" 
                placeholder="0" 
                value={formData.jumlah} 
                onChange={handleChange}
                className={`h-12 rounded-xl bg-slate-50/50 transition-all text-base text-slate-800 font-medium ${
                  errors.jumlah 
                    ? "border-red-300 focus-visible:ring-red-200 focus-visible:border-red-500" 
                    : "border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary"
                }`}
              />
              {errors.jumlah && (
                <p className="text-sm text-red-500 font-bold flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-4 w-4" /> {errors.jumlah}
                </p>
              )}
            </div>

            {/* Input Kondisi (Dropdown) */}
            <div className="space-y-3">
              <Label htmlFor="kondisi" className="text-slate-700 font-bold text-base">Kondisi</Label>
              <select 
                id="kondisi" 
                name="kondisi"
                value={formData.kondisi} 
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer"
              >
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
                <option value="Hilang">Hilang</option>
              </select>
            </div>

            {/* Keterangan Textarea */}
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="keterangan" className="text-slate-700 font-bold text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" /> Keterangan Tambahan
              </Label>
              <textarea 
                id="keterangan" 
                name="keterangan" 
                rows={3}
                placeholder="Lokasi barang, merk, atau catatan lain..."
                value={formData.keterangan} 
                onChange={handleChange}
                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base font-medium text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all resize-y min-h-[100px]"
              />
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
              {isLoading ? "Menyimpan..." : "Simpan Inventaris"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}