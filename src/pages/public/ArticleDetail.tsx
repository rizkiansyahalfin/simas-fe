import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import  Button  from "@/components/ui/button";

// 1. Tambahkan property 'content', 'quote', dan 'subheading' agar tiap artikel punya isi beda
const DUMMY_ARTICLES = [
	{
		id: 1,
		title: "Pentingnya Menjaga Kebersihan Masjid",
		date: "06 Mei 2026",
		author: "Ustadz Ahmad",
		imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
		firstParagraph:
			"Masjid bukan hanya tempat untuk melaksanakan shalat lima waktu, tetapi juga pusat kegiatan umat Islam. Oleh karena itu, menjaga kebersihan dan kenyamanan masjid adalah tanggung jawab kita bersama. Lingkungan yang bersih akan menambah kekhusyukan dalam beribadah.",
		quote: "Kesucian (kebersihan) itu adalah sebagian dari iman.",
		quoteSource: "HR. Muslim",
		subheading: "Langkah Nyata Memakmurkan Masjid",
		lastParagraph:
			"Memakmurkan masjid tidak selalu berarti membangun bangunan yang megah. Menjaga kebersihan karpet, merapikan sandal di luar, dan memastikan tempat wudhu bersih juga merupakan bentuk memakmurkan masjid.",
	},
	{
		id: 2,
		title: "Keutamaan Shalat Subuh Berjamaah",
		date: "04 Mei 2026",
		author: "Takmir Masjid",
		imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80",
		firstParagraph:
			"Shalat subuh berjamaah adalah salah satu ibadah yang paling berat namun memiliki ganjaran yang luar biasa. Banyak umat Islam yang belum menyadari bahwa fajar adalah waktu di mana keberkahan diturunkan secara melimpah bagi mereka yang melangkah ke masjid.",
		quote: "Dua rakaat shalat fajar lebih baik dari dunia dan seisinya.",
		quoteSource: "HR. Muslim",
		subheading: "Disaksikan oleh Para Malaikat",
		lastParagraph:
			"Mari kita kuatkan tekad untuk meramaikan shaf subuh. Dengan memulai hari di rumah Allah, kita mengundang keberkahan untuk seluruh aktivitas kita hingga matahari terbenam.",
	},
	{
		id: 3,
		title: "Laporan Keuangan ZISWAF Bulan April",
		date: "01 Mei 2026",
		author: "Bendahara",
		imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
		firstParagraph:
			"Sebagai bentuk transparansi dan amanah pengelola dana umat, kami sampaikan laporan keuangan ZISWAF untuk periode April 2026. Dana yang terkumpul telah disalurkan untuk berbagai program pemberdayaan ekonomi dan bantuan sosial bagi jamaah yang membutuhkan.",
		quote: "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai.",
		quoteSource: "Al-Baqarah: 261",
		subheading: "Rincian Penyaluran Dana",
		lastParagraph:
			"Kami mengucapkan jazakumullah khairan katsiran kepada seluruh donatur. Semoga harta yang diinfakkan menjadi pembersih jiwa dan pembuka pintu rezeki yang berkah.",
	},
];

export default function ArticleDetail() {
	const { id } = useParams();
	const article = DUMMY_ARTICLES.find((item) => item.id === parseInt(id || "0"));

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	if (!article) {
		return (
			<div className='min-h-screen bg-slate-50/30 flex flex-col items-center justify-center font-sans'>
				<h1 className='text-2xl font-bold mb-4'>Artikel tidak ditemukan</h1>
				<Link to='/artikel'>
					<Button variant='outline'>Kembali ke Artikel</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className='relative min-h-screen bg-slate-50/30 py-12 md:py-20 font-sans'>
			<div className='absolute top-0 left-1/2 w-full max-w-4xl h-72 bg-emerald-100/20 rounded-full blur-3xl -translate-x-1/2 -z-10'></div>

			<div className='container mx-auto px-4 max-w-4xl relative z-10'>
				<Link to='/artikel' className='inline-flex mb-8 md:mb-12'>
					<Button
						variant='ghost'
						className='hover:bg-emerald-50 hover:text-simas-primary transition-colors text-gray-500 font-medium -ml-2 rounded-xl px-4 h-10'
					>
						<ArrowLeft className='mr-2 h-4 w-4' /> Kembali ke Artikel
					</Button>
				</Link>

				<div className='space-y-6 md:space-y-8 mb-10 md:mb-12 text-center md:text-left'>
					<div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-gray-500'>
						<span className='bg-emerald-50 border border-emerald-100 text-simas-primary px-4 py-1.5 rounded-full tracking-wide shadow-sm'>
							Berita
						</span>
						<span className='flex items-center gap-2'>
							<div className='p-1.5 bg-white rounded-md shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100'>
								<Calendar className='h-4 w-4 text-emerald-600' />
							</div>
							{article.date}
						</span>
						<span className='flex items-center gap-2'>
							<div className='p-1.5 bg-white rounded-md shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100'>
								<User className='h-4 w-4 text-emerald-600' />
							</div>
							{article.author}
						</span>
					</div>

					<h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight'>
						{article.title}
					</h1>
				</div>

				<div className='w-full aspect-16/10 md:aspect-21/9 rounded-4xl overflow-hidden bg-gray-100 mb-12 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-gray-100 relative group'>
					<img
						src={article.imageUrl}
						alt={article.title}
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out'
					/>
				</div>

				<div className='max-w-3xl mx-auto space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed md:leading-loose'>
					{/* Paragraf pertama dinamis dengan Drop Cap */}
					<p className='first-letter:text-5xl first-letter:md:text-6xl first-letter:font-extrabold first-letter:text-simas-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none'>
						{article.firstParagraph}
					</p>

					{/* Blockquote dinamis */}
					<blockquote className='border-l-4 border-simas-primary bg-emerald-50/50 p-6 md:p-8 rounded-r-2xl text-gray-800 italic my-10 relative overflow-hidden'>
						<div className='absolute top-[-10px] left-2 text-7xl text-emerald-200 opacity-50 font-serif'>
							"
						</div>
						<p className='relative z-10 text-xl md:text-2xl font-medium leading-snug'>{article.quote}</p>
						<footer className='text-base font-bold text-simas-primary mt-4 not-italic tracking-wide flex items-center gap-2'>
							<span className='w-4 h-px bg-simas-primary'></span> {article.quoteSource}
						</footer>
					</blockquote>

					<h3 className='text-2xl md:text-3xl font-extrabold text-gray-900 mt-12 mb-6 tracking-tight'>
						{article.subheading}
					</h3>

					<p>{article.lastParagraph}</p>
				</div>
			</div>
		</div>
	);
}
