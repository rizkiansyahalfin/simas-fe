import { useState } from "react";
import { ShieldCheck, QrCode, Copy, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

// Dummy Recovery Codes
const MOCK_RECOVERY_CODES = [
  "A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6",
  "Q7R8-S9T0", "U1V2-W3X4", "Y5Z6-A7B8", "C9D0-E1F2"
];

export default function TwoFactorSetupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Logic: Simulasi Verifikasi Kode TOTP
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length < 6) return;
    
    setIsLoading(true);
    // Simulasi delay API
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // Pindah ke halaman Recovery Codes
    }, 1000);
  };

  // Logic: Copy Recovery Codes
  const handleCopyCodes = () => {
    navigator.clipboard.writeText(MOCK_RECOVERY_CODES.join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Autentikasi Dua Langkah (2FA)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Lindungi akun Anda dengan keamanan berlapis menggunakan aplikasi Authenticator.
          </p>
        </div>
      </div>

      {/* Step 1: Scan QR & Verify */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Bagian Kiri: Instruksi & QR */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">1</span>
                Pindai Kode QR
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Buka aplikasi Authenticator (seperti Google Authenticator atau Authy) di HP Anda, lalu pindai kode QR di bawah ini.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
              {/* Dummy QR Code UI */}
              <div className="w-48 h-48 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center">
                <QrCode className="h-24 w-24 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg">
                J3K2-L4M5-N6O7-P8Q9
              </p>
            </div>
          </div>

          {/* Bagian Kanan: Input Verifikasi */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">2</span>
                Masukkan Kode
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Setelah berhasil dipindai, masukkan 6 digit kode yang muncul di aplikasi Authenticator Anda untuk verifikasi.
              </p>
            </div>

            <form onSubmit={handleVerify} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Kode Verifikasi (6 Digit)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} // Hanya angka
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono px-4 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              
              <button
                type="submit"
                disabled={verificationCode.length < 6 || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white px-5 py-3.5 rounded-xl font-bold shadow-sm transition-all"
              >
                {isLoading ? "Memverifikasi..." : "Verifikasi & Aktifkan"}
                {!isLoading && <ArrowRight className="size-5" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Recovery Codes */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
          
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex gap-4 items-start">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-1">Simpan Kode Pemulihan Anda!</h3>
              <p className="text-amber-700 dark:text-amber-500 text-sm leading-relaxed">
                2FA berhasil diaktifkan. Jika Anda kehilangan akses ke HP Anda, kode pemulihan ini adalah <b>satu-satunya cara</b> untuk masuk ke akun Anda. Simpan di tempat yang aman dan rahasia.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 relative overflow-hidden">
            <div className="grid grid-cols-2 gap-4 font-mono text-center">
              {MOCK_RECOVERY_CODES.map((code, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-900 py-3 rounded-lg border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold tracking-wider">
                  {code}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleCopyCodes}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white px-5 py-3 rounded-xl font-semibold transition-all"
              >
                {isCopied ? <CheckCircle2 className="size-5 text-emerald-500" /> : <Copy className="size-5" />}
                {isCopied ? "Berhasil Disalin" : "Salin Semua Kode"}
              </button>
              
              <button
                onClick={() => alert("Selesai! Navigasi kembali ke Pengaturan Akun.")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold transition-all"
              >
                Saya Sudah Menyimpannya
              </button>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}