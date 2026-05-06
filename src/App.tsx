import { Routes, Route } from 'react-router-dom'
import LoginPage from './auth/LoginPage'
import ProtectedRoute from './auth/ProtectedRoute'
import ArticlesPage from './articles/pages/ArticlesPage'


function Dashboard() {
  return <div>Dashboard</div>
}

function AdminLayout() {
  return <div>Admin Layout</div> // nanti isi sidebar dll
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected area */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin/articles" element={<ArticlesPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
