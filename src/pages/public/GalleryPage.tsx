import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const DUMMY_GALLERY = [
  { id: 1, title: "Kajian Rutin Ahad Pagi", url: "https://images.unsplash.com/photo-1576057845347-160a2bd7152b?w=600&h=800&fit=crop" }, // Udah diganti
  { id: 2, title: "Penyaluran ZIS ke Warga", url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop" },
  { id: 3, title: "Gotong Royong Bersih Masjid", url: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=600&h=900&fit=crop" },
  { id: 4, title: "Buka Puasa Bersama", url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=500&fit=crop" }, // Udah diganti
  { id: 5, title: "Rapat Pengurus DKM", url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=700&fit=crop" },
  { id: 6, title: "Peringatan Maulid Nabi", url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=800&fit=crop" },
  { id: 7, title: "TPA Anak-anak", url: "https://images.unsplash.com/photo-1532264523420-881a47db012d?w=600&h=500&fit=crop" },
  { id: 8, title: "Shalat Idul Fitri", url: "https://images.unsplash.com/photo-1551041777-ed277b8dd348?w=800&h=600&fit=crop" },
];

export default function GalleryPage() {
  // State untuk nyimpen foto mana yang lagi di-klik buat Lightbox
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Fungsi tutup Lightbox
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri Kegiatan</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Dokumentasi berbagai aktivitas, kajian, dan kegiatan sosial yang diselenggarakan oleh masjid kita.
          </p>
        </div>

        {/* MASONRY GRID LAYOUT (Pakai columns Tailwind) */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {DUMMY_GALLERY.map((item) => (
            <div 
              key={item.id} 
              className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-gray-100"
              onClick={() => setSelectedImage({ url: item.url, title: item.title })}
            >
              {/* Gambar asli (Dummy placeholder) */}
             <img 
                src={item.url} 
                alt={item.title} 
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Kalau gambar error/mati, otomatis ganti ke gambar cadangan warna hijau
                  e.currentTarget.src = `https://placehold.co/600x800/10b981/ffffff?text=Foto+Tidak+Tersedia`;
                }}
              />
              
              {/* Overlay gelap pas di-hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <ZoomIn className="text-white h-8 w-8 mb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" />
                <p className="text-white font-medium text-sm drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200"
          onClick={closeLightbox} // Tutup kalau background diklik
        >
          {/* Tombol Close di pojok kanan atas */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-black/50 hover:bg-white/20 rounded-full transition-colors z-50"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Kontainer Gambar Lightbox */}
          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Biar nggak nutup kalau gambarnya yang diklik
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white text-center mt-4 text-lg font-medium tracking-wide">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}