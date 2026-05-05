import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/public/HomePage";

export default function App() {
  return (
    <Routes>
      {/* Homepage publik */}
      <Route path="/" element={<HomePage />} />
      
      {/* Halaman Login */}
      <Route path="/login" element={<Login />} />
      
      {/* Halaman Admin */}
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
