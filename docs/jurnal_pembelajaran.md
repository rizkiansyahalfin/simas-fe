# Jurnal Pembelajaran Harian (31 Hari)
## Sistem Informasi Manajemen Masjid (SIMAS)

**NAMA MENTOR:** RIZKIANSYAH ALFIN  

| NO | HARI KE | KELAS | MATERI YANG DISAMPAIKAN | PARAF/TANDAMENGAJAR |
|---|---|---|---|---|
| 1 | Hari ke-1 | Fullstack Web Development | Analisis kebutuhan sistem SIMAS (Sistem Informasi Manajemen Masjid), pemodelan proses bisnis, dan perancangan database relasional (ERD) PostgreSQL. | |
| 2 | Hari ke-2 | Fullstack Web Development | Inisialisasi struktur folder Backend (`simas-be`) menggunakan Node.js, Express, TypeScript, dan konfigurasi database PostgreSQL menggunakan Prisma ORM. | |
| 3 | Hari ke-3 | Fullstack Web Development | Inisialisasi struktur folder Frontend (`simas-fe`) menggunakan React, Vite, TypeScript, dan Tailwind CSS (v4) untuk antarmuka pengguna yang responsif. | |
| 4 | Hari ke-4 | Fullstack Web Development | Implementasi fitur registrasi, login user, hashing password dengan bcrypt, dan enkripsi JSON Web Token (JWT) di sisi Backend. | |
| 5 | Hari ke-5 | Fullstack Web Development | Pembuatan halaman Login dan Register di Frontend, validasi form menggunakan React Hook Form & Zod, dan integrasi API client menggunakan Axios. | |
| 6 | Hari ke-6 | Fullstack Web Development | Migrasi database and seeding data awal menggunakan Prisma Client, serta pembuatan endpoint profil user (GET/PUT `/api/users/profile`). | |
| 7 | Hari ke-7 | Fullstack Web Development | Implementasi mekanisme Refresh Token pada modul autentikasi Backend untuk menjaga sesi login user tetap aktif dan aman tanpa login ulang. | |
| 8 | Hari ke-8 | Fullstack Web Development | Implementasi Role-Based Access Control (RBAC) dengan 4 role (`superadmin`, `bendahara`, `admin_kegiatan`, `admin_inventaris`) di Backend dan proteksi halaman di Frontend. | |
| 9 | Hari ke-9 | Fullstack Web Development | Pembuatan modul Mosque Profile (Profil Masjid) dan Gallery CRUD untuk mengelola informasi umum masjid serta foto dokumentasi kegiatan. | |
| 10 | Hari ke-10 | Fullstack Web Development | Pembuatan modul artikel berita masjid, manajemen kategori artikel, dan status publikasi (draft/publish) di sisi Backend dan Frontend. | |
| 11 | Hari ke-11 | Fullstack Web Development | Implementasi upload file/gambar menggunakan Multer di Backend untuk menangani penyimpanan foto galeri dan banner poster kegiatan masjid. | |
| 12 | Hari ke-12 | Fullstack Web Development | Perancangan modul ZIS (Zakat, Infaq, Shadaqah) di Backend: pembuatan schema database ZisTransaction dan pencatatan manual penerimaan zakat oleh bendahara. | |
| 13 | Hari ke-13 | Fullstack Web Development | Pembuatan modul Mustahik (penerima zakat) terintegrasi dengan data jamaah, serta pembuatan endpoint pencatatan distribusi zakat (MustahikDistribution). | |
| 14 | Hari ke-14 | Fullstack Web Development | Pembuatan antarmuka visual ZIS di Frontend: tabel rekap muzakki, pengelolaan status mustahik, dan form pencatatan distribusi zakat. | |
| 15 | Hari ke-15 | Fullstack Web Development | Implementasi fitur Donasi Publik: pembuatan endpoint `POST /api/donations` dengan upload bukti transfer bank secara manual oleh donatur umum. | |
| 16 | Hari ke-16 | Fullstack Web Development | Pembuatan fitur verifikasi dan penolakan donasi masuk oleh Bendahara/Superadmin di Backend, beserta UI verifikasi donasi pending di Dashboard Admin. | |
| 17 | Hari ke-17 | Fullstack Web Development | Integrasi Midtrans Payment Gateway di Backend untuk otomatisasi pembayaran donasi non-tunai melalui QRIS, GoPay, dan Virtual Account (VA). | |
| 18 | Hari ke-18 | Fullstack Web Development | Pembuatan halaman donasi publik di Frontend yang mendukung pilihan transfer manual maupun online (Midtrans) beserta halaman status transaksi dinamis. | |
| 19 | Hari ke-19 | Fullstack Web Development | Pembuatan modul Kampanye Donasi (Campaign) untuk memfasilitasi penggalangan dana khusus (seperti renovasi) dengan target nominal dan batas waktu (deadline). | |
| 20 | Hari ke-20 | Fullstack Web Development | Integrasi grafik statistik interaktif (Recharts) di Frontend untuk memisahkan pencatatan donasi manual dan donasi otomatis via Midtrans. | |
| 21 | Hari ke-21 | Fullstack Web Development | Pembuatan modul Buku Kas Umum (CashTransaction) untuk mencatat arus kas operasional masjid (income/expense) yang tidak bersumber dari ZIS. | |
| 22 | Hari ke-22 | Fullstack Web Development | Implementasi modul Manajemen Jamaah (Congregation): CRUD data jamaah, export data ke format Excel/CSV (ExcelJS/xlsx), dan import massal data jamaah. | |
| 23 | Hari ke-23 | Fullstack Web Development | Pembuatan modul Manajemen Inventaris (Inventory): pencatatan aset masjid, kategori barang, pencatatan kondisi barang, dan upload foto barang inventaris. | |
| 24 | Hari ke-24 | Fullstack Web Development | Implementasi modul Peminjaman Inventaris (InventoryLoan): pencatatan nama peminjam, estimasi tanggal kembali, dan status peminjaman (`borrowed`/`returned`/`overdue`). | |
| 25 | Hari ke-25 | Fullstack Web Development | Implementasi jobs penjadwalan otomatis (Cron Job dengan node-cron) di Backend untuk melakukan cek harian peminjaman inventaris yang terlambat dikembalikan. | |
| 26 | Hari ke-26 | Fullstack Web Development | Pembuatan modul Jadwal Jumat (JumatSchedule) serta sistem notifikasi email otomatis (Nodemailer) pengingat ibadah sholat Jumat untuk petugas (Imam/Khatib). | |
| 27 | Hari ke-27 | Fullstack Web Development | Integrasi API jadwal sholat Kemenag/pihak ketiga di Backend untuk mendapatkan waktu sholat otomatis, serta widget visual jadwal sholat di Frontend. | |
| 28 | Hari ke-28 | Fullstack Web Development | Implementasi notifikasi real-time di Frontend menggunakan teknologi Server-Sent Events (SSE) dari Backend untuk event donasi masuk dan peminjaman baru. | |
| 29 | Hari ke-29 | Fullstack Web Development | Pengembangan fitur Absensi Jamaah real-time berbasis QR Code: pembuatan sesi absen, scanner QR di frontend (html5-qrcode), dan pembuatan laporan absensi admin. | |
| 30 | Hari ke-30 | Fullstack Web Development | Pengujian unit dan integrasi secara menyeluruh (unit testing menggunakan Jest untuk Backend dan Vitest untuk Frontend), debugging error, serta analisis coverage pengujian. | |
| 31 | Hari ke-31 | Fullstack Web Development | Konfigurasi PWA (offline cache, manifest, service worker), i18n (multilingual ID/EN), pengamanan Backend (rate limit, helmet, xss), dan pembuatan build produksi. | | |
