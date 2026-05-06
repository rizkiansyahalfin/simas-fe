import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import AdminLayout from "@/layouts/AdminLayout"
import AuthLayout from "@/layouts/AuthLayout"
import PublicLayout from "@/layouts/PublicLayout"

// Pages
import Login from '@/pages/auth/Login'
import ManajemenKasPage from '@/pages/admin/ManajemenKasPage'
import JadwalSholatPage from '@/pages/public/jadwalSholat'

// Auth
import { useAuthStore } from '@/stores'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import DonationPage from './publicDonation/DonationPage'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<PublicLayout />} />
      <Route path="/donation" element={<DonationPage />} />
      
      <Route
        path="/agenda"
        element={<PublicLayout>Agenda Page</PublicLayout>}
      />

      <Route
        path="/berita"
        element={<PublicLayout>Berita Page</PublicLayout>}
      />

      <Route
        path="/jadwal-shalat"
        element={
          <PublicLayout>
            <JadwalSholatPage />
          </PublicLayout>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/admin" replace />
            : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
        }
      />

      {/* ADMIN (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <div className="p-6">Dashboard</div>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/kas"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ManajemenKasPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App