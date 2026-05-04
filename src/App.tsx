import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuthStore } from './stores'
import './App.css'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Default - redirect ke login jika belum auth, atau ke dashboard setelah login */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />

      {/* Protected routes akan ditambah di sini */}
      {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}

      {/* Catch all - redirect ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
            
