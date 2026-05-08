import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleDetail() {
  const { id } = useParams(); // Ambil ID dari URL

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <Link to="/artikel">
        <Button variant="ghost" className="mb-8 hover:bg-gray-100 -ml-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Artikel
        </Button>
      </Link>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="bg-emerald-100 text-simas-primary px-3 py-1 rounded-full font-semibold">Berita</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 06 Mei 2026</span>
          <span className="flex items-center gap-1"><User className="h-4 w-4" /> Admin SIMAS</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Isi Detail Artikel (Simulasi ID: {id})
        </h1>

        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-100 my-8">
          <img 
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1000&q=80" 
            alt="Cover Artikel" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p>
            Masjid bukan hanya tempat untuk melaksanakan shalat lima waktu, tetapi juga pusat kegiatan umat Islam. Oleh karena itu, menjaga kebersihan dan kenyamanan masjid adalah tanggung jawab kita bersama.
          </p>
          <p>
            Dalam sebuah hadits riwayat Muslim, Rasulullah SAW bersabda: <em>"Kesucian (kebersihan) itu adalah sebagian dari iman."</em> Hadits ini menegaskan betapa pentingnya kebersihan dalam pandangan Islam, terlebih lagi jika itu menyangkut rumah Allah.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Langkah Nyata Memakmurkan Masjid</h3>
          <p>
            Memakmurkan masjid tidak selalu berarti membangun bangunan yang megah. Menjaga kebersihan karpet, merapikan sandal di luar, dan memastikan tempat wudhu bersih juga merupakan bentuk memakmurkan masjid yang nilainya sangat mulia di sisi Allah.
          </p>
        </div>
      </div>
    </div>
  );
}