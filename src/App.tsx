import { Routes, Route } from "react-router-dom";

// Import Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Import Pages
import Login from "./pages/auth/Login";
import Home from "./pages/public/Home";
import PrayerConfig from "./pages/admin/PrayerConfig"; // <-- Import file baru tiket lu hari ini

export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Utama (Public) */}
      <Route path="/" element={
        <PublicLayout>
          <Home />
        </PublicLayout>
      } />
      
      {/* 2. Halaman Login */}
      <Route path="/login" element={<Login />} />
      
      {/* 3. Halaman Admin (Sekarang pakai Nested Routes biar bisa nambah banyak halaman) */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            {/* Tampilan default kalau cuma buka /admin */}
            <Route path="/" element={
              <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Selamat Datang di Dashboard SIMAS</h2>
                <p className="text-gray-500 mt-2">Pilih menu di samping untuk mulai mengelola masjid.</p>
              </div>
            } />
            
            {/* Tampilan halaman konfigurasi dari tiket (feat/fe-prayer-config-page) */}
            <Route path="/pengaturan/jadwal-shalat" element={<PrayerConfig />} />
          </Routes>
        </AdminLayout>
      } />
    </Routes>
  );
}