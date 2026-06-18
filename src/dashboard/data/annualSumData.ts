export const TAHUN_LIST = [2024, 2023, 2022, 2021]

export const ANNUAL_KPI = [
  { label: 'Total Pemasukan',   value: 'Rp 412,6 Jt', trend: '+18%', up: true,  colorClass: 'ar-kpi-green'  },
  { label: 'Total Donasi',      value: 'Rp 198,4 Jt', trend: '+11%', up: true,  colorClass: 'ar-kpi-amber'  },
  { label: 'Total Pengeluaran', value: 'Rp 187,2 Jt', trend: '+9%',  up: false, colorClass: 'ar-kpi-red'    },
  { label: 'Surplus / Saldo',   value: 'Rp 225,4 Jt', trend: '+28%', up: true,  colorClass: 'ar-kpi-blue'   },
  { label: 'Jamaah Baru',       value: '284',          trend: '+32',  up: true,  colorClass: 'ar-kpi-purple' },
  { label: 'Mustahik Dilayani', value: '156',          trend: '+14',  up: true,  colorClass: 'ar-kpi-teal'   },
]

/* ── Keuangan bulanan (area chart) ── */
export const KEUANGAN_TAHUNAN = [
  { bulan: 'Jan', pemasukan: 28200000, pengeluaran: 12500000 },
  { bulan: 'Feb', pemasukan: 32400000, pengeluaran: 14000000 },
  { bulan: 'Mar', pemasukan: 45500000, pengeluaran: 18200000 },
  { bulan: 'Apr', pemasukan: 37800000, pengeluaran: 15800000 },
  { bulan: 'Mei', pemasukan: 42600000, pengeluaran: 19300000 },
  { bulan: 'Jun', pemasukan: 38100000, pengeluaran: 16700000 },
  { bulan: 'Jul', pemasukan: 34900000, pengeluaran: 14200000 },
  { bulan: 'Agu', pemasukan: 40200000, pengeluaran: 17800000 },
  { bulan: 'Sep', pemasukan: 35600000, pengeluaran: 15600000 },
  { bulan: 'Okt', pemasukan: 29800000, pengeluaran: 13800000 },
  { bulan: 'Nov', pemasukan: 33100000, pengeluaran: 14500000 },
  { bulan: 'Des', pemasukan: 54400000, pengeluaran: 24800000 }, 
]

/* ── ZIS stacked bar ── */
export const ZIS_TAHUNAN = [
  { bulan: 'Jan', zakat: 11200000, infaq: 8100000, sedekah: 4400000, wakaf: 1200000 },
  { bulan: 'Feb', zakat: 12400000, infaq: 9200000, sedekah: 5100000, wakaf: 1800000 },
  { bulan: 'Mar', zakat: 18500000, infaq: 13800000, sedekah: 7200000, wakaf: 2500000 },
  { bulan: 'Apr', zakat: 14800000, infaq: 10400000, sedekah: 5600000, wakaf: 1900000 },
  { bulan: 'Mei', zakat: 17600000, infaq: 12200000, sedekah: 6800000, wakaf: 2100000 },
  { bulan: 'Jun', zakat: 15100000, infaq: 11800000, sedekah: 5700000, wakaf: 1800000 },
  { bulan: 'Jul', zakat: 13900000, infaq: 10600000, sedekah: 4900000, wakaf: 1400000 },
  { bulan: 'Agu', zakat: 16200000, infaq: 12300000, sedekah: 6100000, wakaf: 2200000 },
  { bulan: 'Sep', zakat: 14600000, infaq: 10200000, sedekah: 5800000, wakaf: 1600000 },
  { bulan: 'Okt', zakat: 11800000, infaq: 8400000, sedekah: 4200000, wakaf: 1100000 },
  { bulan: 'Nov', zakat: 13100000, infaq: 9500000, sedekah: 5300000, wakaf: 1500000 },
  { bulan: 'Des', zakat: 24200000, infaq: 18300000, sedekah: 9100000, wakaf: 3200000 },
]
export const ZIS_COLORS = { zakat: '#059669', infaq: '#10b981', sedekah: '#34d399', wakaf: '#a7f3d0' }

/* ── Pertumbuhan jamaah (line) ── */
export const JAMAAH_TAHUNAN = [
  { bulan: 'Jan', total: 1000, baru: 22, mustahik: 130 },
  { bulan: 'Feb', total: 1040, baru: 40, mustahik: 133 },
  { bulan: 'Mar', total: 1084, baru: 44, mustahik: 138 },
  { bulan: 'Apr', total: 1104, baru: 20, mustahik: 140 },
  { bulan: 'Mei', total: 1132, baru: 28, mustahik: 143 },
  { bulan: 'Jun', total: 1157, baru: 25, mustahik: 146 },
  { bulan: 'Jul', total: 1179, baru: 22, mustahik: 148 },
  { bulan: 'Agu', total: 1204, baru: 25, mustahik: 151 },
  { bulan: 'Sep', total: 1226, baru: 22, mustahik: 152 },
  { bulan: 'Okt', total: 1248, baru: 22, mustahik: 153 },
  { bulan: 'Nov', total: 1261, baru: 13, mustahik: 155 },
  { bulan: 'Des', total: 1284, baru: 23, mustahik: 156 },
]

/* ── Kegiatan per kategori (bar) ── */
export const KEGIATAN_TAHUNAN = [
  { bulan: 'Jan', ibadah: 8,  pendidikan: 4,  sosial: 2,  lainnya: 1 },
  { bulan: 'Feb', ibadah: 8,  pendidikan: 5,  sosial: 3,  lainnya: 1 },
  { bulan: 'Mar', ibadah: 12, pendidikan: 6,  sosial: 5,  lainnya: 2 }, // Ramadhan
  { bulan: 'Apr', ibadah: 14, pendidikan: 7,  sosial: 8,  lainnya: 3 }, // Ramadhan + Idul Fitri
  { bulan: 'Mei', ibadah: 8,  pendidikan: 5,  sosial: 3,  lainnya: 1 },
  { bulan: 'Jun', ibadah: 9,  pendidikan: 5,  sosial: 3,  lainnya: 1 },
  { bulan: 'Jul', ibadah: 10, pendidikan: 5,  sosial: 4,  lainnya: 1 }, // Idul Adha
  { bulan: 'Agu', ibadah: 8,  pendidikan: 6,  sosial: 3,  lainnya: 2 }, // HUT RI
  { bulan: 'Sep', ibadah: 8,  pendidikan: 5,  sosial: 2,  lainnya: 1 },
  { bulan: 'Okt', ibadah: 8,  pendidikan: 4,  sosial: 3,  lainnya: 1 },
  { bulan: 'Nov', ibadah: 9,  pendidikan: 5,  sosial: 3,  lainnya: 1 },
  { bulan: 'Des', ibadah: 10, pendidikan: 6,  sosial: 4,  lainnya: 2 },
]
export const KEGIATAN_COLORS = {
  ibadah: '#10b981', pendidikan: '#0ea5e9', sosial: '#f59e0b', lainnya: '#a78bfa',
}

/* ── Distribusi donasi pie ── */
export const DONASI_PIE = [
  { name: 'Infaq Masjid',  value: 35 },
  { name: 'Zakat Maal',    value: 30 },
  { name: 'Sedekah',       value: 18 },
  { name: 'Wakaf',         value: 10 },
  { name: 'Operasional',   value: 7  },
]
export const DONASI_PIE_COLORS = ['#10b981','#059669','#34d399','#047857','#a7f3d0']

/* ── Top 5 kegiatan terbesar ── */
export const TOP_KEGIATAN = [
  { nama: 'Pesantren Kilat Ramadhan',    kategori: 'Pendidikan', peserta: 312, bulan: 'Maret' },
  { nama: 'Bakti Sosial Idul Adha',      kategori: 'Sosial',     peserta: 280, bulan: 'Juli'  },
  { nama: 'Santunan 1000 Anak Yatim',   kategori: 'Sosial',     peserta: 254, bulan: 'April' },
  { nama: 'Tabligh Akbar Tahun Baru Hijriah', kategori: 'Ibadah', peserta: 220, bulan: 'Juli' },
  { nama: 'Khataman Quran Ramadhan',    kategori: 'Ibadah',     peserta: 198, bulan: 'April' },
]

/* ── Ringkasan teks untuk PDF / print ── */
export const ANNUAL_HIGHLIGHT = [
  { icon: '🕌', label: 'Total Kegiatan', value: '126 kegiatan sepanjang tahun' },
  { icon: '📖', label: 'Juz Dibaca',     value: '18.720 juz dalam khataman rutin' },
  { icon: '🤲', label: 'ZIS Tersalurkan', value: 'Rp 156,8 Jt kepada 156 mustahik' },
  { icon: '🎓', label: 'Siswa Tahfidz',  value: '148 santri aktif, 12 wisuda huffadz' },
]