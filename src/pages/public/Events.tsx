import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight } from "lucide-react";

// Data Dummy Agenda Kegiatan
const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Kajian Tafsir Al-Baqarah",
    speaker: "Ustadz Dr. Firanda Andirja",
    date: "10",
    month: "Mei",
    fullDate: "Minggu, 10 Mei 2026",
    time: "05:00 - 06:30 WIB (Ba'da Subuh)",
    location: "Ruang Utama Masjid SIMAS",
    type: "Kajian Rutin",
  },
  {
    id: 2,
    title: "Tabligh Akbar: Menjemput Lailatul Qadar",
    speaker: "Ustadz Abdul Somad",
    date: "15",
    month: "Mei",
    fullDate: "Jumat, 15 Mei 2026",
    time: "20:00 - Selesai (Ba'da Isya)",
    location: "Halaman Utama Masjid",
    type: "Tabligh Akbar",
  },
  {
    id: 3,
    title: "Kajian Muslimah: Fiqih Wanita",
    speaker: "Ustadzah Oki Setiana Dewi",
    date: "20",
    month: "Mei",
    fullDate: "Rabu, 20 Mei 2026",
    time: "09:00 - 11:00 WIB",
    location: "Aula Serbaguna Lt. 2",
    type: "Kajian Muslimah",
  },
];

export default function Events() {
  return (
    <div className="relative min-h-screen bg-slate-50/50 py-12 sm:py-16 md:py-24 overflow-hidden font-sans">
      {/* Dekorasi Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-simas-primary text-sm font-bold tracking-wide uppercase mb-4">
            <CalendarIcon className="w-4 h-4" />
            Jadwal & Agenda
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Agenda Kegiatan</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Ikuti berbagai kajian keislaman dan kegiatan sosial yang diselenggarakan di lingkungan masjid kita.
          </p>
        </div>

        {/* List Agenda */}
        <div className="space-y-6">
          {DUMMY_EVENTS.map((event) => (
            <div 
              key={event.id} 
              className="group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.08)] hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 p-5 sm:p-6 md:p-8 flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 items-start md:items-center relative cursor-pointer overflow-hidden"
            >
              {/* Ornamen Transparan di dalam Card */}
              <div className="absolute -right-10 -bottom-10 opacity-0 group-hover:opacity-5 transition-opacity duration-500 transform group-hover:scale-150">
                <span className="text-9xl">🕌</span>
              </div>

              {/* Tanggal Box (Kiri) */}
              <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 border border-emerald-100/80 rounded-2xl p-4 sm:p-5 flex min-w-24 flex-row items-center justify-center gap-2 shrink-0 text-simas-primary shadow-inner group-hover:scale-105 group-hover:shadow-emerald-200/50 transition-all duration-300 sm:min-w-[110px] sm:flex-col sm:gap-0">
                <span className="text-4xl font-extrabold">{event.date}</span>
                <span className="text-sm font-bold uppercase tracking-widest mt-1">{event.month}</span>
              </div>

              {/* Info Konten (Tengah) */}
              <div className="flex-1 space-y-4 w-full relative z-10">
                {/* Badge Tipe Kajian */}
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/80 border border-emerald-100 text-simas-primary rounded-full text-xs font-bold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-simas-primary"></span>
                    {event.type}
                  </span>
                </div>
                
                {/* Judul Agenda */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-simas-primary transition-colors duration-300 md:pr-8">
                  {event.title}
                </h3>
                
                {/* Grid Info Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-600 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <User className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-gray-700">{event.speaker}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <CalendarIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="font-medium">{event.fullDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <Clock className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="font-medium">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="font-medium line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Icon Arrow di Kanan (Muncul saat Hover) */}
              <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-emerald-50 items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight className="h-6 w-6 text-simas-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
