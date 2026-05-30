import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import { ArrowDownCircle } from "lucide-react";
import { ArrowUpCircle } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { validateForm, required, positiveNumber } from "@/lib/validate";

interface ZisForm {
  type: string
  category: string
  amount: string
  date: string
  desc: string
}

interface ZisItem {
  id: number
  date: string
  type: string
  category: string
  amount: number
  desc: string
}

const INITIAL_FORM: ZisForm = { type: "Pemasukan", category: "Zakat Fitrah", amount: "", date: "", desc: "" }

const CATEGORIES = ["Zakat Fitrah", "Zakat Maal", "Infaq", "Sedekah", "Wakaf"]

export default function ZisManagement() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<ZisItem[]>([
    { id: 1, date: "05 Mei 2026", type: "Pemasukan", category: "Infaq", amount: 1500000, desc: "Kotak Amal Jumat" },
    { id: 2, date: "03 Mei 2026", type: "Penyaluran", category: "Sedekah", amount: 2000000, desc: "Bantuan Panti Asuhan Bantul" },
    { id: 3, date: "01 Mei 2026", type: "Pemasukan", category: "Zakat Fitrah", amount: 5000000, desc: "Hamba Allah (Transfer BSI)" },
  ]);
  const [form, setForm] = useState<ZisForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(key: keyof ZisForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateForm(form as unknown as Record<string, unknown>, {
      amount: [required("Nominal"), positiveNumber("Nominal")],
      date: [required("Tanggal")],
      desc: [required("Keterangan")],
    })
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    const newItem: ZisItem = {
      id: Date.now(),
      date: new Date(form.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      type: form.type,
      category: form.category,
      amount: Number(form.amount),
      desc: form.desc,
    }
    setItems((prev) => [newItem, ...prev])
    setForm(INITIAL_FORM)
    setErrors({})
    setShowForm(false)
    toast.success("Transaksi ZIS berhasil disimpan.")
  }

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
            <Wallet className="h-8 w-8 text-simas-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Manajemen ZIS
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">
              Kelola catatan pemasukan dan penyaluran dana umat.
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className={`h-12 px-6 rounded-xl font-bold transition-all duration-300 ${
            showForm 
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none' 
              : 'bg-simas-primary hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5'
          }`}
        >
          {showForm ? <><X className="h-5 w-5 mr-2" /> Batal</> : <><Plus className="h-5 w-5 mr-2" /> Tambah Transaksi</>}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Saldo */}
        <div className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 relative z-10">
            <Wallet className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Saldo Kas</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{formatRupiah(4500000)}</h3>
          </div>
        </div>
        
        {/* Card Pemasukan */}
        <div className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 relative z-10">
            <ArrowDownCircle className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Pemasukan</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{formatRupiah(6500000)}</h3>
          </div>
        </div>

        {/* Card Penyaluran */}
        <div className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 relative z-10">
            <ArrowUpCircle className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Penyaluran</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-600">{formatRupiah(2000000)}</h3>
          </div>
        </div>
      </div>

      {/* Form Input Transaksi (Muncul kalau tombol Tambah Transaksi diklik) */}
      {showForm && (
        <div className="bg-white p-6 sm:p-10 rounded-4xl border border-emerald-100/60 shadow-xl shadow-slate-200/40 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"></div>
          
          <h3 className="text-xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-simas-primary text-sm">📝</span>
            Form Transaksi Baru
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-3">
                <Label className="text-slate-700 font-bold text-base">Jenis Transaksi</Label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer h-12 rounded-xl border-2 transition-all ${form.type === 'Pemasukan' ? 'border-simas-primary bg-emerald-50 text-simas-primary' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-200'}`}>
                    <input type="radio" name="type" value="Pemasukan" checked={form.type === "Pemasukan"} onChange={(e) => updateField("type", e.target.value)} className="hidden" />
                    <ArrowDownCircle className="h-5 w-5" />
                    <span className="text-sm font-bold">Pemasukan</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer h-12 rounded-xl border-2 transition-all ${form.type === 'Penyaluran' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-rose-200'}`}>
                    <input type="radio" name="type" value="Penyaluran" checked={form.type === "Penyaluran"} onChange={(e) => updateField("type", e.target.value)} className="hidden" />
                    <ArrowUpCircle className="h-5 w-5" />
                    <span className="text-sm font-bold">Penyaluran</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-slate-700 font-bold text-base">Kategori (ZIS)</Label>
                <select id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)} className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 text-base font-medium text-slate-700 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all">
                  {CATEGORIES.map((cat) => (<option key={cat}>{cat}</option>))}
                </select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="amount" className="text-slate-700 font-bold text-base">Nominal (Rp)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold">Rp</span>
                  </div>
                  <Input id="amount" type="number" placeholder="500000" value={form.amount} onChange={(e) => updateField("amount", e.target.value)} className={`h-12 pl-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base font-medium ${errors.amount ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200" : ""}`} />
                </div>
                {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="date" className="text-slate-700 font-bold text-base">Tanggal</Label>
                <Input id="date" type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} className={`h-12 rounded-xl bg-slate-50/50 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base font-medium ${errors.date ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`} />
                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
              </div>

            </div>

            <div className="space-y-3">
              <Label htmlFor="desc" className="text-slate-700 font-bold text-base">Keterangan / Deskripsi</Label>
              <Input id="desc" placeholder="Contoh: Hamba Allah via transfer BSI" value={form.desc} onChange={(e) => updateField("desc", e.target.value)} className={`h-12 rounded-xl bg-slate-50/50 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all text-base font-medium ${errors.desc ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`} />
              {errors.desc && <p className="text-sm text-red-500 mt-1">{errors.desc}</p>}
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="h-12 w-full md:w-auto bg-simas-primary hover:bg-emerald-700 text-white px-10 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <Save className="mr-2.5 h-5 w-5" /> Simpan Data Transaksi
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="p-6 md:px-8 md:py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-800">Riwayat Transaksi Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 md:px-8">Tanggal</th>
                <th className="px-6 py-4">Jenis</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4 md:px-8 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Belum ada transaksi ZIS.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-5 md:px-8 text-slate-600 font-medium whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center w-max gap-1.5 border ${item.type === 'Pemasukan' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {item.type === 'Pemasukan' ? <ArrowDownCircle className="h-3.5 w-3.5" /> : <ArrowUpCircle className="h-3.5 w-3.5" />}
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-800">{item.category}</td>
                    <td className="px-6 py-5 text-slate-500">{item.desc}</td>
                    <td className={`px-6 py-5 md:px-8 text-right font-extrabold whitespace-nowrap text-base ${item.type === 'Pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'Pemasukan' ? '+' : '-'} {formatRupiah(item.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}