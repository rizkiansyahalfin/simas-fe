import { useState } from "react";
import { Search, PlayCircle, BookOpen, ChevronDown, MonitorPlay, ShieldCheck, Users } from "lucide-react";

const GUIDES = [
 {
  id: 1,
  role: "Admin",
  title: "Cara Menambahkan Pengurus Baru",
  desc: "Panduan lengkap menambahkan dan mengatur hak akses pengurus masjid.",
  videoUrl: "https://www.youtube.com/embed/_Oee3vGJ5AI",
  icon: ShieldCheck,
},
{
  id: 2,
  role: "Pengurus",
  title: "Manajemen Sesi Absensi & QR Code",
  desc: "Cara membuka sesi kegiatan, melakukan absensi manual, dan scan QR.",
  videoUrl: "https://www.youtube.com/embed/vP22JePZnZQ",
  icon: MonitorPlay,
},
{
  id: 3,
  role: "Pengurus",
  title: "Verifikasi Donasi Masuk",
  desc: "Langkah-langkah mengecek dan menyetujui donasi jamaah.",
  videoUrl: "https://www.youtube.com/embed/VIDEO_DONATION_APPROVAL",
  icon: BookOpen,
},
{
  id: 4,
  role: "Jamaah",
  title: "Cara Melakukan Donasi Online",
  desc: "Panduan berdonasi via QRIS atau Transfer Bank langsung dari aplikasi.",
  videoUrl: "https://www.youtube.com/embed/VIDEO_QRIS_DONATION",
  icon: Users,
},
];

const FAQS = [
  {
    q: "Bagaimana cara mereset password jika saya lupa?",
    a: "Anda dapat menekan tombol 'Lupa Password' di halaman login. Tautan reset akan dikirimkan ke email yang terdaftar.",
  },
  {
    q: "Mengapa QR Code absensi saya tidak bisa discan?",
    a: "Pastikan kecerahan layar HP Anda cukup dan tidak ada pantulan cahaya berlebih. Jika masih gagal, mintalah pengurus untuk memasukkan NIK Anda secara manual.",
  },
  {
    q: "Apakah bukti donasi bisa diunduh kembali?",
    a: "Ya, Anda bisa melihat riwayat donasi di profil Anda dan mengunduh ulang bukti pembayarannya kapan saja.",
  },
];

const ROLES = ["Semua", "Admin", "Pengurus", "Jamaah"];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState("Semua");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter logika pencarian & role
  const filteredGuides = GUIDES.filter((guide) => {
    const matchSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        guide.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = activeRole === "Semua" || guide.role === activeRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-4 md:p-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER & SEARCH */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-2">
            <BookOpen className="size-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pusat Bantuan SIMAS
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Temukan panduan penggunaan, video tutorial, dan jawaban atas pertanyaan yang sering diajukan di sini.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input
              type="text"
              placeholder="Cari panduan... (Cth: cara donasi, absensi)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* TABS ROLE FILTER */}
        <div className="flex flex-wrap justify-center gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeRole === role
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* GUIDES & VIDEOS GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div key={guide.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Video Embed */}
                  <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative group">
                    <iframe 
                      src={guide.videoUrl} 
                      title={guide.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {guide.role}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Icon className="size-5 text-emerald-500" /> {guide.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {guide.desc}
                    </p>
                    <button className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1 hover:underline">
                      <PlayCircle className="size-4" /> Tonton Panduan
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Pencarian "{searchQuery}" tidak ditemukan.</p>
            </div>
          )}
        </div>

        {/* FAQ ACCORDION */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pertanyaan Sering Diajukan (FAQ)</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-500" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                    <ChevronDown className={`size-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-500" : ""}`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="px-6 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}