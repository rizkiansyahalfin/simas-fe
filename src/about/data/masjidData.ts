import { Award, BookOpen, Car, Droplets, Heart, Landmark, Star, Users, Wifi } from 'lucide-react';

/* ─── Data ─── */
export const SEJARAH_TIMELINE = [
  { tahun: '1975', judul: 'Pendirian Masjid', deskripsi: 'Masjid Al-Ikhlas didirikan oleh para tokoh masyarakat setempat dengan semangat gotong royong dan swadaya umat.' },
  { tahun: '1990', judul: 'Renovasi Pertama', deskripsi: 'Dilakukan perluasan bangunan utama untuk menampung jamaah yang semakin bertambah hingga kapasitas 500 orang.' },
  { tahun: '2005', judul: 'Pembangunan Menara', deskripsi: 'Pembangunan menara setinggi 30 meter sebagai landmark kawasan dan simbol keagungan Islam di wilayah ini.' },
  { tahun: '2015', judul: 'Renovasi Besar', deskripsi: 'Renovasi menyeluruh dengan arsitektur modern-islami, penambahan perpustakaan, ruang kelas, dan fasilitas modern.' },
  { tahun: '2024', judul: 'Sistem Digital SIMAS', deskripsi: 'Implementasi sistem manajemen masjid digital (SIMAS) untuk transparansi keuangan dan pelayanan jamaah.' },
]

export const PENGURUS = [
  { nama: 'KH. Ahmad Mustofa', jabatan: 'Ketua Takmir',        inisial: 'AM', bg: 'bg-emerald-600', bio: 'Ulama senior dengan pengalaman 30 tahun dalam pengelolaan masjid.' },
  { nama: 'Dr. Hasan Basri',   jabatan: 'Sekretaris',           inisial: 'HB', bg: 'bg-sky-600',     bio: 'Akademisi dan aktivis sosial, aktif dalam program pemberdayaan umat.' },
  { nama: 'Ir. Budi Santoso',  jabatan: 'Bendahara',            inisial: 'BS', bg: 'bg-amber-600',   bio: 'Profesional keuangan dengan rekam jejak transparansi pengelolaan dana.' },
  { nama: 'Ustadz Rizal F.',   jabatan: 'Bidang Ibadah',        inisial: 'RF', bg: 'bg-violet-600',  bio: 'Imam masjid sekaligus koordinator kajian rutin dan program keagamaan.' },
  { nama: 'Ibu Siti Aminah',   jabatan: 'Bidang Sosial',        inisial: 'SA', bg: 'bg-pink-600',    bio: 'Koordinator program ZIS, santunan anak yatim, dan kegiatan sosial kemasyarakatan.' },
  { nama: 'Yusuf Hakim, S.T.', jabatan: 'Bidang Sarana',        inisial: 'YH', bg: 'bg-teal-600',    bio: 'Bertanggung jawab atas pemeliharaan dan pengembangan sarana prasarana masjid.' },
]

export const FASILITAS = [
  { Icon: Users,    label: 'Kapasitas',        value: '1.200+ Jamaah',      bg: 'bg-emerald-50', color: 'text-simas-primary-dark' },
  { Icon: BookOpen, label: 'Perpustakaan',     value: '2.500+ Koleksi',     bg: 'bg-sky-50',     color: 'text-sky-700' },
  { Icon: Wifi,     label: 'WiFi Gratis',      value: 'Seluruh Area',       bg: 'bg-violet-50',  color: 'text-violet-700' },
  { Icon: Car,      label: 'Area Parkir',      value: '200 Kendaraan',      bg: 'bg-amber-50',   color: 'text-amber-700' },
  { Icon: Droplets, label: 'Tempat Wudhu',     value: '80 Keran',           bg: 'bg-blue-50',    color: 'text-blue-700' },
  { Icon: Award,    label: 'Kelas Tahfidz',    value: '12 Kelas Aktif',     bg: 'bg-pink-50',    color: 'text-pink-700' },
]

export const PROGRAM = [
  { icon: '📖', title: "Kajian Ba'da Maghrib",   desc: 'Setiap hari, dipimpin ustadz terjadwal', tag: 'Rutin' },
  { icon: '🎓', title: 'Tahfidz Al-Quran',       desc: 'Program hafalan untuk anak & dewasa',    tag: 'Pendidikan' },
  { icon: '💰', title: 'Santunan Anak Yatim',    desc: 'Bulanan untuk 150+ anak yatim binaan',  tag: 'Sosial' },
  { icon: '🩺', title: 'Klinik Kesehatan Gratis',desc: 'Setiap Sabtu pagi untuk jamaah',         tag: 'Sosial' },
  { icon: '📚', title: 'TPA & TPSA',             desc: 'Pendidikan agama untuk anak-anak',       tag: 'Pendidikan' },
  { icon: '💼', title: 'Bimbingan Zakat',        desc: 'Konsultasi & penyaluran zakat maal',    tag: 'Keuangan' },
]

export const STATS = [
  { value: '49+', label: 'Tahun Berdiri',    Icon: Landmark },
  { value: '1.284', label: 'Jamaah Terdaftar', Icon: Users },
  { value: '156',   label: 'Mustahik Aktif',   Icon: Heart },
  { value: '12',    label: 'Program Aktif',    Icon: Star },
]

export const TAG_COLOR: Record<string, string> = {
  Rutin:      'pill',
  Pendidikan: 'about-tag-pendidikan',
  Sosial:     'about-tag-sosial',
  Keuangan:   'about-tag-keuangan',
}