import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Clock, XCircle, ArrowLeft, Home } from "lucide-react";

export default function PaymentStatusPage() {
  const [searchParams] = useSearchParams();
  
  // Ambil data dari URL (contoh: /payment-status?status=pending&order_id=DON-123&amount=150000)
  const status = searchParams.get("status") || "success"; 
  const orderId = searchParams.get("order_id") || "DON-" + Math.floor(Math.random() * 1000000);
  const amount = searchParams.get("amount") || "0";

  const formatRupiah = (angka: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

  // Konfigurasi dinamis berdasarkan status
  const statusConfig = {
    success: {
      icon: <CheckCircle2 className="h-24 w-24 text-emerald-500 relative z-10" />,
      glow: "bg-emerald-400",
      title: "Alhamdulillah, Pembayaran Berhasil!",
      desc: "Donasi Anda telah kami terima dengan baik.",
      colorBox: "bg-emerald-50 border-emerald-200 text-emerald-800",
      instructions: "Semoga Allah membalas kebaikan Anda dengan pahala yang berlipat ganda. Tanda terima telah dikirimkan ke email Anda."
    },
    pending: {
      icon: <Clock className="h-24 w-24 text-amber-500 relative z-10" />,
      glow: "bg-amber-400",
      title: "Menunggu Pembayaran",
      desc: "Transaksi Anda sedang menunggu pelunasan.",
      colorBox: "bg-amber-50 border-amber-200 text-amber-800",
      instructions: "Silakan selesaikan pembayaran sesuai instruksi Midtrans atau transfer ke rekening masjid sebelum batas waktu habis."
    },
    failed: {
      icon: <XCircle className="h-24 w-24 text-red-500 relative z-10" />,
      glow: "bg-red-400",
      title: "Pembayaran Gagal",
      desc: "Mohon maaf, transaksi Anda tidak dapat diproses.",
      colorBox: "bg-red-50 border-red-200 text-red-800",
      instructions: "Batas waktu pembayaran mungkin telah habis atau terjadi kesalahan pada sistem. Silakan ulangi proses donasi Anda."
    }
  };

  // Kalau status di URL ngawur, arahin ke success sebagai default
  const currentConfig = statusConfig[status as keyof typeof statusConfig] || statusConfig.success;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans bg-slate-50/50">
      <div className="bg-white max-w-md w-full rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden text-center p-8 md:p-10">
        
        {/* Animasi Icon & Glow */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className={`absolute inset-0 blur-2xl opacity-30 ${currentConfig.glow}`}></div>
            {currentConfig.icon}
          </div>
        </div>

        {/* Judul & Deskripsi */}
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">{currentConfig.title}</h1>
        <p className="text-slate-500 font-medium mb-8 text-sm md:text-base">{currentConfig.desc}</p>

        {/* Kotak Detail Transaksi */}
        <div className={`p-5 rounded-2xl border mb-8 text-sm font-medium ${currentConfig.colorBox}`}>
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-current/10">
            <span className="opacity-80">ID Transaksi</span>
            <span className="font-bold uppercase tracking-wider">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="opacity-80 text-sm mt-1">Nominal</span>
            <span className="font-extrabold">{formatRupiah(amount)}</span>
          </div>
        </div>

        {/* Instruksi Tindak Lanjut */}
        <p className="text-slate-600 text-sm mb-8 leading-relaxed">
          {currentConfig.instructions}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link 
            to="/campaigns" 
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-simas-primary text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Program Donasi
          </Link>
          <Link 
            to="/" 
            className="flex items-center justify-center w-full py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" /> Halaman Utama
          </Link>
        </div>

      </div>
    </div>
  );
}