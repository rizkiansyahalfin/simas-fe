import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, User, ArrowLeft, Download, Share2, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Data Dummy Detail Kegiatan
const DUMMY_EVENT = {
  id: "1",
  title: "Kajian Akbar: Menjemput Keberkahan di Bulan Ramadhan",
  description: `Mari hadiri kajian akbar yang akan membahas persiapan spiritual dan praktis dalam menyambut bulan suci Ramadhan. 
  Kajian ini bertujuan untuk memberikan pemahaman mendalam tentang fadhilah Ramadhan serta tips menjaga konsistensi ibadah. 
  Acara ini terbuka untuk umum (Ikhwan & Akhwat). Disediakan konsumsi buka puasa sunnah bagi yang menjalankan.`,
  date: "2024-03-09",
  startTime: "16:00",
  endTime: "18:00",
  location: "Ruang Utama Masjid Agung SIMAS",
  speaker: "Ust. Dr. H. Ahmad Mudzakkir, M.A",
  speakerBio: "Dosen Tafsir Al-Qur'an dan Penulis Buku 'Cahaya Ramadhan'.",
  image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=600&fit=crop", // Link foto yang udah diperbarui
  gallery: [
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519818175545-c496261548e6?w=400&h=400&fit=crop"
  ]
};

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fungsi generate file .ics untuk kalender
  const addToCalendar = () => {
    const event = DUMMY_EVENT;
    const startDate = event.date.replace(/-/g, '') + 'T' + event.startTime.replace(':', '') + '00';
    const endDate = event.date.replace(/-/g, '') + 'T' + event.endTime.replace(':', '') + '00';
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.location}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `event-${id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("File kalender berhasil diunduh! Silakan buka untuk simpan ke jadwal Anda.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link kegiatan berhasil disalin ke clipboard!");
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      {/* Hero Image Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        {/* Gambar Utama dengan fitur Fallback onError */}
        <img 
          src={DUMMY_EVENT.image} 
          alt={DUMMY_EVENT.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/1200x600/059669/ffffff?text=Foto+Kegiatan`;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-4 -ml-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Button>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {DUMMY_EVENT.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Konten Utama (Kiri) */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Info className="h-6 w-6 text-emerald-600" /> Deskripsi Kegiatan
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {DUMMY_EVENT.description}
            </p>
          </section>

          {/* Galeri Foto */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800">Galeri Foto</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DUMMY_EVENT.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Info Detail Sidebar (Kanan) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6 sticky top-24">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tanggal</p>
                  <p className="font-semibold text-slate-800">{new Date(DUMMY_EVENT.date).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Waktu</p>
                  <p className="font-semibold text-slate-800">{DUMMY_EVENT.startTime} - {DUMMY_EVENT.endTime} WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lokasi</p>
                  <p className="font-semibold text-slate-800">{DUMMY_EVENT.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                <div className="p-2 bg-white rounded-xl shadow-xs">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Narasumber</p>
                  <p className="font-bold text-emerald-700">{DUMMY_EVENT.speaker}</p>
                  <p className="text-sm text-slate-500 italic mt-1">{DUMMY_EVENT.speakerBio}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={addToCalendar}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-emerald-200"
              >
                <Download className="mr-2 h-5 w-5" /> Simpan ke Kalender
              </Button>
              <Button 
                variant="outline"
                onClick={handleShare}
                className="w-full h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-white"
              >
                <Share2 className="mr-2 h-5 w-5" /> Bagikan Kegiatan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}