import { Rocket, Wrench, Bug, Sparkles, GitCommit } from "lucide-react";

// Tipe Data untuk Changelog
interface ChangeItem {
  type: "feature" | "improvement" | "fix";
  text: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  changes: ChangeItem[];
}

// Data Riwayat Pembaruan (Nantinya bisa ditarik dari API/CMS)
const CHANGELOG_DATA: Release[] = [
  {
    version: "v1.2.0",
    date: "12 Juni 2026",
    title: "Keamanan Ekstra & Optimasi Performa",
    changes: [
      { type: "feature", text: "Implementasi Two-Factor Authentication (2FA) dengan QR dan Recovery Codes untuk keamanan akun Admin." },
      { type: "improvement", text: "Optimasi performa ekstrim menggunakan WebP, Lazy Loading, dan Code Splitting (mencapai skor Lighthouse 100)." },
      { type: "feature", text: "Fitur Scanner QR Code terintegrasi via kamera untuk absensi jamaah secara real-time." },
    ]
  },
  {
    version: "v1.1.0",
    date: "08 Juni 2026",
    title: "Manajemen Sesi & Dukungan PWA",
    changes: [
      { type: "feature", text: "Penambahan modul Manajemen Sesi Absensi (buka/tutup sesi kegiatan masjid)." },
      { type: "improvement", text: "Penyempurnaan Progressive Web App (PWA) dengan custom banner install prompt." },
      { type: "fix", text: "Memperbaiki bug layout pada tabel data ketika diakses melalui perangkat mobile." },
    ]
  },
  {
    version: "v1.0.0",
    date: "25 Mei 2026",
    title: "Rilis Publik Pertama SIMAS",
    changes: [
      { type: "feature", text: "Peluncuran portal publik untuk informasi jadwal shalat, berita, dan galeri masjid." },
      { type: "feature", text: "Sistem donasi online terintegrasi dengan berbagai metode pembayaran." },
      { type: "feature", text: "Dashboard Admin untuk manajemen inventaris, kas, dan database jamaah." },
    ]
  }
];

// Helper untuk Icon dan Warna Badge
const getBadgeConfig = (type: string) => {
  switch (type) {
    case "feature":
      return { icon: Sparkles, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", label: "Fitur Baru" };
    case "improvement":
      return { icon: Rocket, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", label: "Peningkatan" };
    case "fix":
      return { icon: Bug, color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400", label: "Perbaikan" };
    default:
      return { icon: Wrench, color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", label: "Lainnya" };
  }
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl mb-4">
            <GitCommit className="size-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Riwayat Pembaruan
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Pantau terus perkembangan, fitur terbaru, dan perbaikan sistem pada aplikasi SIMAS untuk kenyamanan pelayanan masjid.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
          
          {CHANGELOG_DATA.map((release, index) => (
            <div key={release.version} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline Node (Titik Tengah) */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-emerald-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>

              {/* Card Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-800 dark:text-white">{release.version}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {release.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  {release.title}
                </h3>

                <ul className="space-y-4">
                  {release.changes.map((change, i) => {
                    const config = getBadgeConfig(change.type);
                    const Icon = config.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 px-2 py-1 rounded-md flex items-center gap-1.5 shrink-0 ${config.color}`}>
                          <Icon className="size-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">{config.label}</span>
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {change.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}