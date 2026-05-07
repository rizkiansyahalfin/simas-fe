import { Routes, Route } from "react-router-dom";

// Import Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Import Pages (Public)
import Home from "./pages/public/Home";
import Articles from "./pages/public/Articles";
import ArticleDetail from "./pages/public/ArticleDetail";
import Events from "./pages/public/Events"; 

// Import Pages (Auth & Admin)
import Login from "./pages/auth/Login";
import PrayerConfig from "./pages/admin/PrayerConfig";

export default function App() {
  return (
    <Routes>
      {/* --- RUTE PUBLIK --- */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/artikel" element={<PublicLayout><Articles /></PublicLayout>} />
      <Route path="/artikel/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
      <Route path="/agenda" element={<PublicLayout><Events /></PublicLayout>} /> {/* <-- RUTE BARU AGENDA */}
      
      {/* --- RUTE AUTH --- */}
      <Route path="/login" element={<Login />} />
      
      {/* --- RUTE ADMIN --- */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            <Route path="/" element={
              <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Selamat Datang di Dashboard SIMAS</h2>
                <p className="text-gray-500 mt-2">Pilih menu di samping untuk mulai mengelola masjid.</p>
              </div>
            } />
            <Route path="/pengaturan/jadwal-shalat" element={<PrayerConfig />} />
          </Routes>
        </AdminLayout>
      } />
    </Routes>
  );
}