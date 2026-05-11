import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Pages – Publik
import Home from "@/pages/public/Home";
import Articles from "@/pages/public/Articles";
import ArticleDetail from "@/pages/public/ArticleDetail";
import Events from "@/pages/public/Events"; // dari HEAD
import JadwalSholatPage from "@/pages/public/jadwalSholat";

// Pages – Admin
import ManajemenKasPage from "@/pages/admin/ManajemenKasPage";
import InventoryListPage from "@/pages/admin/InventoryListPage";
import PrayerConfig from "@/pages/admin/PrayerConfig";

// Auth
import Login from "@/pages/auth/Login";
import { useAuthStore } from "@/stores";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
	const { isAuthenticated } = useAuthStore();

	return (
		<Routes>
			{/* ── PUBLIC ── */}
			<Route
				path='/'
				element={
					<PublicLayout>
						<Home />
					</PublicLayout>
				}
			/>

			<Route
				path='/agenda'
				element={
					<PublicLayout>
						<Events />
					</PublicLayout>
				}
			/>

			<Route path='/berita' element={<PublicLayout>Berita Page</PublicLayout>} />

			<Route
				path='/jadwal-shalat'
				element={
					<PublicLayout>
						<JadwalSholatPage />
					</PublicLayout>
				}
			/>

			<Route
				path='/artikel'
				element={
					<PublicLayout>
						<Articles />
					</PublicLayout>
				}
			/>

			<Route
				path='/artikel/:id'
				element={
					<PublicLayout>
						<ArticleDetail />
					</PublicLayout>
				}
			/>

			{/* ── LOGIN ── */}
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

			{/* ── ADMIN (PROTECTED) ── */}
			<Route
				path='/admin'
				element={
					<ProtectedRoute>
						<AdminLayout>
							<div className='p-6'>Dashboard</div>
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/kas'
				element={
					<ProtectedRoute>
						<AdminLayout>
							<ManajemenKasPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/inventaris'
				element={
					<ProtectedRoute>
						<AdminLayout>
							<InventoryListPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/pengaturan/jadwal-shalat'
				element={
					<ProtectedRoute>
						<AdminLayout>
							<PrayerConfig />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* ── FALLBACK ── */}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	);
}

export default App;
