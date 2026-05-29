import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Save } from "lucide-react";
import { HeartHandshake } from "lucide-react";
import { FileText } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ZisDistributionForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk isian form ZIS
  const [formData, setFormData] = useState({
    mustahik: "",
    kategori_asnaf: "Miskin",
    nominal: "",
    tanggal: new Date().toISOString().split("T")[0],
    keterangan: "",
    referensi_transaksi: "" // Link ke transaksi ZIS terkait
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validasi Error (Contoh: Tolak kalau nominal lebih dari 50 Juta)
    if (Number(formData.nominal) > 50000000) {
      toast.error("Gagal menyimpan, nominal terlalu besar!");
      return; // Berhenti di sini, form nggak akan disimpen
    }

    setIsLoading(true);
    
    // 2. Simulasi loading simpan data
    setTimeout(() => {
      setIsLoading(false);
      
      // Hapus alert jadul, ganti pakai toast Sonner
      toast.success(`Berhasil! Dana ZIS untuk ${formData.mustahik} dicatat.`);
      
      navigate(-1); 
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
          <HeartHandshake className="h-8 w-8 text-simas-primary" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Form Distribusi ZIS
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
            Catat penyaluran dana zakat, infaq, dan sedekah kepada mustahik.
          </p>
        </div>
      </div>

      {/* Card Form Premium */}
      <div className="bg-white p-6 sm:p-10 md:p-12 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        
        {/* Dekorasi Background Halus di dalam Card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Nama Mustahik */}
            <div className="space-y-3">
              <Label htmlFor="mustahik" className="text-slate-700 font-bold text-base">Nama Mustahik (Penerima)</Label>
              <Input 
                id="mustahik" 
                name="mustahik"
                placeholder="Nama individu atau lembaga" 
                value={formData.mustahik}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
                required 
              />
            </div>

            {/* Kategori Asnaf */}
            <div className="space-y-3">
              <Label htmlFor="kategori_asnaf" className="text-slate-700 font-bold text-base">Kategori Asnaf</Label>
              <select 
                id="kategori_asnaf" 
                name="kategori_asnaf"
                value={formData.kategori_asnaf}
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all cursor-pointer"
              >
                <option value="Fakir">Fakir</option>
                <option value="Miskin">Miskin</option>
                <option value="Amil">Amil</option>
                <option value="Mualaf">Mualaf</option>
                <option value="Gharimin">Gharimin</option>
                <option value="Fisabilillah">Fisabilillah</option>
                <option value="Ibnu Sabil">Ibnu Sabil</option>
              </select>
            </div>

            {/* Nominal (Dengan Prefix Rp) */}
            <div className="space-y-3">
              <Label htmlFor="nominal" className="text-slate-700 font-bold text-base">Nominal Penyaluran</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold">Rp</span>
                </div>
                <Input 
                  id="nominal" 
                  name="nominal"
                  type="number" 
                  placeholder="0" 
                  value={formData.nominal}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
                  required 
                />
              </div>
            </div>

            {/* Tanggal */}
            <div className="space-y-3">
              <Label htmlFor="tanggal" className="text-slate-700 font-bold text-base">Tanggal Salur</Label>
              <Input 
                id="tanggal" 
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium cursor-pointer"
                required 
              />
            </div>

            {/* Link Transaksi */}
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="referensi_transaksi" className="text-slate-700 font-bold text-base flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-slate-400" /> Link/ID Transaksi ZIS (Opsional)
              </Label>
              <Input 
                id="referensi_transaksi" 
                name="referensi_transaksi"
                placeholder="ID Transaksi dari buku kas" 
                value={formData.referensi_transaksi}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base text-slate-800 font-medium"
              />
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
                placeholder="Catatan tujuan penyaluran atau keterangan pendukung..."
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
              {isLoading ? "Menyimpan..." : "Simpan Distribusi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}