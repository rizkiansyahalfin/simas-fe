import { Navigate, Route, Routes } from "react-router-dom"

import AdminLayout from "@/layouts/AdminLayout"
import AuthLayout from "@/layouts/AuthLayout"
import PublicLayout from "@/layouts/PublicLayout"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />} path="/" />
      <Route element={<AuthLayout />} path="/auth" />
      <Route element={<AdminLayout />} path="/admin" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App
