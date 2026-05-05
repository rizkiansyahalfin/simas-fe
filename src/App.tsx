import { Navigate, Route, Routes } from "react-router-dom"

import AdminLayout from "@/layouts/AdminLayout"
import AuthLayout from "@/layouts/AuthLayout"
import PublicLayout from "@/layouts/PublicLayout"
import ManajemenKasPage from "@/pages/admin/ManajemenKasPage"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />} path="/" />
      <Route
        element={
          <PublicLayout>
            <div className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
              <h1 className="m-0 text-2xl font-semibold tracking-normal">
                Agenda
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Area konten halaman agenda.
              </p>
            </div>
          </PublicLayout>
        }
        path="/agenda"
      />
      <Route
        element={
          <PublicLayout>
            <div className="rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
              <h1 className="m-0 text-2xl font-semibold tracking-normal">
                Berita
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Area konten halaman berita.
              </p>
            </div>
          </PublicLayout>
        }
        path="/berita"
      />
      <Route element={<AuthLayout />} path="/auth" />
      <Route
        element={
          <AdminLayout>
            <ManajemenKasPage />
          </AdminLayout>
        }
        path="/admin"
      />
      <Route
        element={
          <AdminLayout>
            <ManajemenKasPage />
          </AdminLayout>
        }
        path="/admin/kas"
      />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App