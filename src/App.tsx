import { Routes, Route } from "react-router-dom";

// Import Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Import Pages
import Login from "./pages/auth/Login";
import Home from "./pages/public/Home";
import Articles from "./pages/public/Articles"; // <-- Import List
import ArticleDetail from "./pages/public/ArticleDetail"; // <-- Import Detail
import PrayerConfig from "./pages/admin/PrayerConfig";

export default function App() {
  return (
    <Routes>
      {/* --- RUTE PUBLIK --- */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/artikel" element={<PublicLayout><Articles /></PublicLayout>} />
      <Route path="/artikel/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
      {/* --------------------- */}
      
      {/* Rute Auth */}
      <Route path="/login" element={<Login />} />
      
      {/* Rute Admin */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            <Route path="/" element={
              <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Selamat Datang di Dashboard SIMAS</h2>
              </div>
            } />
            <Route path="/pengaturan/jadwal-shalat" element={<PrayerConfig />} />
          </Routes>
        </AdminLayout>
      } />
    </Routes>
  );
}