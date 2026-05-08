import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

// Data dummy sementara
const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "Pentingnya Menjaga Kebersihan Masjid",
    excerpt: "Masjid adalah rumah Allah, menjaga kebersihannya adalah sebagian dari iman. Mari kita bahas...",
    date: "06 Mei 2026",
    author: "Ustadz Ahmad",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=500&q=80"
  },
  {
    id: 2,
    title: "Keutamaan Shalat Subuh Berjamaah",
    excerpt: "Shalat subuh berjamaah memiliki pahala yang luar biasa. Ketahui apa saja keutamaan-keutamaannya...",
    date: "04 Mei 2026",
    author: "Takmir Masjid",
    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=500&q=80"
  },
  {
    id: 3,
    title: "Laporan Keuangan ZISWAF Bulan April",
    excerpt: "Berikut adalah laporan penerimaan dan penyaluran dana Zakat, Infaq, Sedekah, dan Wakaf (ZISWAF)...",
    date: "01 Mei 2026",
    author: "Bendahara",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80"
  }
];

export default function Articles() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita & Artikel</h1>
        <p className="text-lg text-gray-600">Informasi terbaru seputar kegiatan masjid dan kajian keislaman.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_ARTICLES.map((article) => (
          <Link to={`/artikel/${article.id}`} key={article.id} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-simas-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="text-simas-primary font-semibold text-sm flex items-center">
                  Baca selengkapnya &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}