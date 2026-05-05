import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import { useAuthStore } from './stores'
import AdminLayout from './layouts/AdminLayout'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      {/* Root redirect */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Navigate to="/admin" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated ? (
           
            <AdminLayout>
              <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">
                  Selamat Datang di Dashboard SIMAS
                </h2>
                <p className="text-gray-500 mt-2">
                  Pilih menu di samping untuk mulai mengelola masjid.
                </p>
              </div>
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App