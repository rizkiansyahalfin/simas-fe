import { Routes, Route } from "react-router-dom";

// Import Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout"; // Tambahan baru

// Import Pages
import Login from "./pages/auth/Login";
import Home from "./pages/public/Home"; // Tambahan baru

export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Utama (Public) */}
      {/* Sekarang root "/" nampilin Home, bukan lempar ke Login lagi */}
      <Route path="/" element={
        <PublicLayout>
          <Home />
        </PublicLayout>
      } />
      
      {/* 2. Halaman Login */}
      <Route path="/login" element={<Login />} />
      
      {/* 3. Halaman Admin (RBAC Sidebar yang kemaren lu kerjain) */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Selamat Datang di Dashboard SIMAS</h2>
            <p className="text-gray-500 mt-2">Pilih menu di samping untuk mulai mengelola masjid.</p>
          </div>
        </AdminLayout>
      } />
    </Routes>
  );
}