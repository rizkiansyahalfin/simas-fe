import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Pages
import Login from "@/pages/auth/Login";
import ManajemenKasPage from "@/pages/admin/ManajemenKasPage";

function App() {
	const { isAuthenticated } = useAuthStore();

	return (
		<Routes>
			{/* ROOT - Redirect berdasarkan auth status */}
			<Route
				path='/'
				element={isAuthenticated ? <Navigate to='/admin' replace /> : <Navigate to='/login' replace />}
			/>

			{/* AUTH ROUTES */}
			<Route
				path='/login'
				element={
					isAuthenticated ? (
						<Navigate to='/admin' replace />
					) : (
						<AuthLayout>
							<Login />
						</AuthLayout>
					)
				}
			/>

			{/* PUBLIC ROUTES */}
			<Route
				path='/agenda'
				element={
					<PublicLayout>
						<div className='rounded-lg border border-emerald-200 bg-white p-6 shadow-sm'>
							<h1 className='text-2xl font-semibold'>Agenda</h1>
							<p className='text-sm text-slate-500 mt-2'>Area konten halaman agenda.</p>
						</div>
					</PublicLayout>
				}
			/>

			<Route
				path='/berita'
				element={
					<PublicLayout>
						<div className='rounded-lg border border-emerald-200 bg-white p-6 shadow-sm'>
							<h1 className='text-2xl font-semibold'>Berita</h1>
							<p className='text-sm text-slate-500 mt-2'>Area konten halaman berita.</p>
						</div>
					</PublicLayout>
				}
			/>

			{/* ADMIN ROUTES - PROTECTED */}
			<Route
				path='/admin'
				element={
					isAuthenticated ? (
						<AdminLayout>
							<div className='p-10 text-center'>
								<h2 className='text-2xl font-bold'>Selamat Datang di Dashboard SIMAS</h2>
								<p className='text-gray-500 mt-2'>
									Pilih menu di samping untuk mulai mengelola masjid.
								</p>
							</div>
						</AdminLayout>
					) : (
						<Navigate to='/login' replace />
					)
				}
			/>

			<Route
				path='/admin/kas'
				element={
					isAuthenticated ? (
						<AdminLayout>
							<ManajemenKasPage />
						</AdminLayout>
					) : (
						<Navigate to='/login' replace />
					)
				}
			/>

			{/* FALLBACK - 404 redirect ke root */}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	);
}

export default App;
