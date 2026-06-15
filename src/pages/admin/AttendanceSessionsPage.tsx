import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahan import navigasi
import { CalendarClock, Plus, CheckCircle2, Eye, X, QrCode } from "lucide-react"; // Tambah QrCode icon
import { Badge } from "@/components/ui/badge";
import DataTable, { type ColumnConfig } from "@/components/DataTable";

// 1. Tipe Data dengan Index Signature
interface AttendanceSession {
  [key: string]: any;
  id: string;
  title: string;
  type: "Shalat" | "Kajian" | "Kegiatan Khusus";
  startTime: string;
  endTime: string | null;
  status: "Aktif" | "Ditutup";
  attendeesCount: number;
}

// 2. Data Dummy Awal
const INITIAL_SESSIONS: AttendanceSession[] = [
  { id: "SES-001", title: "Shalat Subuh Berjamaah", type: "Shalat", startTime: "2026-06-08 04:30", endTime: "2026-06-08 05:00", status: "Ditutup", attendeesCount: 45 },
  { id: "SES-002", title: "Kajian Ahad Pagi", type: "Kajian", startTime: "2026-06-08 06:00", endTime: "2026-06-08 07:30", status: "Ditutup", attendeesCount: 120 },
  { id: "SES-003", title: "Shalat Dzuhur Berjamaah", type: "Shalat", startTime: "2026-06-08 11:55", endTime: null, status: "Aktif", attendeesCount: 25 },
];

export default function AttendanceSessionsPage() {
  const [sessions, setSessions] = useState<AttendanceSession[]>(INITIAL_SESSIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigasi
  
  // State untuk form tambah sesi
  const [formData, setFormData] = useState({ title: "", type: "Shalat" });

  // 3. Logic: Buat Sesi Baru
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: AttendanceSession = {
      id: `SES-00${sessions.length + 1}`,
      title: formData.title,
      type: formData.type as AttendanceSession["type"],
      startTime: new Date().toISOString().slice(0, 16).replace("T", " "), // Format YYYY-MM-DD HH:mm
      endTime: null,
      status: "Aktif",
      attendeesCount: 0,
    };
    setSessions([newSession, ...sessions]); // Taruh di paling atas
    setIsModalOpen(false);
    setFormData({ title: "", type: "Shalat" }); // Reset form
  };

  // 4. Logic: Tutup Sesi
  const handleCloseSession = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, status: "Ditutup", endTime: new Date().toISOString().slice(0, 16).replace("T", " ") } 
        : session
    ));
  };

  // 5. Konfigurasi Kolom DataTable
  const columns: ColumnConfig<AttendanceSession>[] = [
    { header: "ID Sesi", accessorKey: "id" },
    { header: "Nama Sesi", accessorKey: "title" },
    { 
      header: "Tipe", 
      accessorKey: "type",
      cell: (item) => (
        <span className={`font-medium ${item.type === 'Shalat' ? 'text-blue-600' : 'text-purple-600'}`}>
          {item.type}
        </span>
      )
    },
    { header: "Waktu Buka", accessorKey: "startTime" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (item) => (
        <Badge className={item.status === "Aktif" ? "bg-emerald-500 text-white animate-pulse" : "bg-slate-300 text-slate-700"}>
          {item.status}
        </Badge>
      )
    },
    { header: "Jml Hadir", accessorKey: "attendeesCount" },
    {
      header: "Aksi",
      accessorKey: "id",
      cell: (item) => (
        <div className="flex items-center gap-2">
          {item.status === "Aktif" && (
            <>
              {/* Tombol Mulai Absen (Navigasi ke halaman Scanner) */}
              <button 
                onClick={() => navigate('/admin/attendance/scan')}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
              >
                <QrCode className="size-3.5" /> Mulai Absen
              </button>
              
              {/* Tombol Tutup Sesi */}
              <button 
                onClick={() => handleCloseSession(item.id)}
                className="px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg flex items-center gap-1 transition-colors"
              >
                <CheckCircle2 className="size-3.5" /> Tutup
              </button>
            </>
          )}
          
          {item.status === "Ditutup" && (
            <button 
              onClick={() => alert(`Navigasi ke halaman rekap ${item.id} belum dibuat`)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Eye className="size-3.5" /> Rekap
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans space-y-8 relative">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100/50 shrink-0">
            <CalendarClock className="h-7 w-7 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manajemen Sesi Absensi</h1>
            <p className="text-slate-500 text-sm mt-1">Buat dan pantau sesi kehadiran jamaah secara *real-time*.</p>
          </div>
        </div>
        
        {/* Tombol Buat Sesi */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all"
        >
          <Plus className="size-5" /> Buat Sesi Baru
        </button>
      </div>

      {/* Tabel Sesi */}
      <DataTable 
        title="Daftar Sesi Absensi"
        exportFilename="Laporan_Sesi_Absensi"
        columns={columns}
        data={sessions}
      />

      {/* Modal Form Buat Sesi Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Buat Sesi Absensi Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateSession} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipe Kegiatan</label>
                <select 
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Shalat">Shalat Wajib</option>
                  <option value="Kajian">Kajian / Taklim</option>
                  <option value="Kegiatan Khusus">Kegiatan Khusus</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Sesi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Cth: Shalat Maghrib Berjamaah"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Buka Sesi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}