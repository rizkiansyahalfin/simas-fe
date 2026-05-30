import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { User } from "lucide-react";
import { Newspaper } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Seo from "@/lib/Seo";
import { useState } from "react";
import  ArticleSearchFilter  from "@/components/articles/ArticleSearchFilter";

// Data dummy sementara
const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "Pentingnya Menjaga Kebersihan Masjid",
    excerpt: "Masjid adalah rumah Allah, menjaga kebersihannya adalah sebagian dari iman. Mari kita bahas bagaimana langkah konkrit yang bisa kita lakukan bersama...",
    date: "06 Mei 2026",
    category: "Kajian",
    author: "Ustadz Ahmad",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=500&q=80"
  },
  {
    id: 2,
    title: "Keutamaan Shalat Subuh Berjamaah",
    excerpt: "Shalat subuh berjamaah memiliki pahala yang luar biasa. Ketahui apa saja keutamaan-keutamaannya agar kita semakin semangat bangun di pagi hari...",
    date: "04 Mei 2026",
    category: "Kajian",
    author: "Takmir Masjid",
    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=500&q=80"
  },
  {
    id: 3,
    title: "Laporan Keuangan ZISWAF Bulan April",
    excerpt: "Berikut adalah laporan penerimaan dan penyaluran dana Zakat, Infaq, Sedekah, dan Wakaf (ZISWAF) untuk transparansi kepada seluruh jamaah...",
    date: "01 Mei 2026",
    category: "Keuangan",
    author: "Bendahara",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80"
  }
];

export default function Articles() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filteredArticles = DUMMY_ARTICLES.filter((article) => {
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "Semua" || article.category === category
    return matchSearch && matchCategory
  })

  return (
    <>
      <Seo
        title="Artikel"
        description="Baca artikel dan laporan kegiatan masjid untuk memperkuat ibadah, sosial, dan transparansi pengelolaan SIMAS."
        image="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80"
      />
      <div className="relative min-h-screen bg-slate-50/30 py-16 md:py-24 font-sans">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-1/2 w-full max-w-3xl h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* Header Section */}
        <div className="mb-14 text-center md:text-left flex flex-col md:items-start items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-simas-primary text-sm font-bold tracking-wide uppercase mb-5">
            <Newspaper className="w-4 h-4" />
            Pusat Informasi
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Berita & Artikel</h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl">
            Informasi terbaru, inspirasi islami, dan laporan kegiatan seputar masjid.
          </p>
        </div>

        {/* Filter Pencarian */}
        <ArticleSearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {/* Grid Artikel */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">Tidak ada artikel yang cocok dengan pencarian.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {filteredArticles.map((article) => (
            <Link to={`/artikel/${article.id}`} key={article.id} className="group flex">
              <div className="bg-white rounded-4xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 w-full flex flex-col">

                {/* Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay saat Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Container */}
                <div className="p-7 md:p-8 flex flex-col flex-1 relative bg-white">

                  {/* Meta Data (Tanggal & Penulis) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-emerald-50 group-hover:text-simas-primary transition-colors">
                        <Calendar className="h-3.5 w-3.5" />
                      </div>
                      {article.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-emerald-50 group-hover:text-simas-primary transition-colors">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      {article.author}
                    </div>
                  </div>

                  {/* Judul */}
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-simas-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt / Ringkasan */}
                  <p className="text-gray-500 text-sm md:text-base line-clamp-3 mb-6 flex-1 leading-relaxed font-medium">
                    {article.excerpt}
                  </p>

                  {/* Link Baca Selengkapnya */}
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-simas-primary font-bold text-sm group-hover:text-emerald-700 transition-colors">
                    Baca selengkapnya
                    <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
    </>
  );
}