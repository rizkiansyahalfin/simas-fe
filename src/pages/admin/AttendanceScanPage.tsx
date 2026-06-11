import { useState, useEffect } from "react";
import { QrCode, Keyboard, UserCheck, CalendarClock } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Badge } from "@/components/ui/badge";
import DataTable, { type ColumnConfig } from "@/components/DataTable";

// 1. Tipe Data untuk Tabel
interface Attendee {
  [key: string]: any; // Wajib biar DataTable ga error
  id: string;
  nik: string;
  name: string;
  time: string;
  method: "QR Scan" | "Manual NIK";
}

// Dummy Sesi (Nantinya dari API)
const ACTIVE_SESSIONS = [
  { id: "SES-001", title: "Shalat Subuh Berjamaah" },
  { id: "SES-002", title: "Kajian Ahad Pagi" },
];

export default function AttendanceScanPage() {
  const [selectedSession, setSelectedSession] = useState(ACTIVE_SESSIONS[0].id);
  const [manualNik, setManualNik] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isScannerActive, setIsScannerActive] = useState(false);

  // 2. Logic Scanner QR Code
  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (isScannerActive) {
      // Inisialisasi Scanner
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          // Kalau berhasil scan, panggil fungsi absen
          handleAttend(decodedText, "QR Scan");
          
          // Opsional: Pause scanner sebentar biar ga dobel scan
          scanner?.pause(true);
          setTimeout(() => scanner?.resume(), 2000);
        },
        (error) => {
          // Error wajar terjadi setiap frame jika QR tidak ditemukan, abaikan saja
        }
      );
    }

    // Cleanup saat komponen ditutup atau scanner dimatikan
    return () => {
      if (scanner) {
        scanner.clear().catch((e) => console.error("Gagal mematikan scanner", e));
      }
    };
  }, [isScannerActive]); // Berjalan ulang setiap state isScannerActive berubah

  // 3. Logic Input Kehadiran (Gabungan Manual & QR)
  const handleAttend = (nikInput: string, method: "QR Scan" | "Manual NIK") => {
    if (!nikInput.trim()) return;

    // Cek apakah NIK sudah absen di sesi ini (biar ga dobel)
    const isAlreadyScanned = attendees.some(a => a.nik === nikInput);
    if (isAlreadyScanned) {
      alert(`NIK ${nikInput} sudah terabsen!`);
      return;
    }

    const newAttendee: Attendee = {
      id: `ATT-${Date.now()}`,
      nik: nikInput,
      name: `Jamaah ${nikInput.slice(-4)}`, // Dummy nama berdasarkan NIK
      time: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      method: method,
    };

    setAttendees((prev) => [newAttendee, ...prev]); // Taruh yang terbaru di paling atas
    
    // Reset input jika manual
    if (method === "Manual NIK") setManualNik("");
  };

  // 4. Konfigurasi Kolom Tabel
  const columns: ColumnConfig<Attendee>[] = [
    { header: "Waktu", accessorKey: "time" },
    { header: "NIK", accessorKey: "nik" },
    { header: "Nama Jamaah", accessorKey: "name" },
    { 
      header: "Metode", 
      accessorKey: "method",
      cell: (item) => (
        <Badge className={item.method === "QR Scan" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}>
          {item.method}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans space-y-8">
      
      {/* Header & Pilihan Sesi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
            <UserCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">Input Absensi</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Pindai QR atau masukkan NIK jamaah secara manual.</p>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 md:min-w-[250px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <CalendarClock className="size-4" /> Sesi Aktif
          </label>
          <select 
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none w-full font-medium"
          >
            {ACTIVE_SESSIONS.map(session => (
              <option key={session.id} value={session.id}>{session.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Input Zone (Kamera & Manual) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Card Manual Input */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
              <Keyboard className="size-5 text-blue-500" /> Input NIK Manual
            </h3>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleAttend(manualNik, "Manual NIK"); }} 
              className="flex gap-2"
            >
              <input 
                type="text" 
                placeholder="Ketik NIK..."
                value={manualNik}
                onChange={(e) => setManualNik(e.target.value.replace(/\D/g, ''))} // Hanya angka
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button 
                type="submit"
                disabled={!manualNik}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors"
              >
                Kirim
              </button>
            </form>
          </div>

          {/* Card QR Scanner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <QrCode className="size-5 text-emerald-500" /> Scan QR
              </h3>
              <button
                onClick={() => setIsScannerActive(!isScannerActive)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  isScannerActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {isScannerActive ? "Matikan Kamera" : "Aktifkan Kamera"}
              </button>
            </div>
            
            {/* Tempat Render Scanner html5-qrcode */}
            <div className={`w-full overflow-hidden rounded-xl border-2 ${isScannerActive ? 'border-emerald-500' : 'border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center min-h-[250px]'}`}>
              {isScannerActive ? (
                <div id="qr-reader" className="w-full"></div> // Wajib ada id="qr-reader" untuk html5-qrcode
              ) : (
                <div className="text-center text-slate-400 dark:text-slate-500 flex flex-col items-center">
                  <QrCode className="size-12 mb-2 opacity-50" />
                  <p className="text-sm font-medium">Kamera Nonaktif</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Kolom Kanan: Real-time List */}
        <div className="lg:col-span-2">
          <DataTable 
            title="Daftar Hadir Real-time"
            exportFilename={`Absensi_${selectedSession}`}
            columns={columns}
            data={attendees}
          />
        </div>

      </div>
    </div>
  );
}