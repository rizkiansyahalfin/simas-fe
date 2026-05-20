import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Pages – Publik
import Home from "@/pages/public/Home";
import Articles from "@/pages/public/Articles";
import ArticleDetail from "@/pages/public/ArticleDetail";
import Events from "@/pages/public/Events";
import JadwalSholatPage from "@/pages/public/jadwalSholat";
import DonationPage from "./publicDonation/DonationPage";

// Pages – Admin
import DonasiMasukPage from "@/pages/admin/DonasiMasukPage";
import ManajemenKasPage from "@/pages/admin/ManajemenKasPage";
import InventoryListPage from "@/pages/admin/InventoryListPage";
import PrayerConfig from "@/pages/admin/PrayerConfig";
import MosqueProfileSettings from "@/pages/admin/MosqueProfileSettings";
import VerifyDonasi from "@/pages/admin/verifyDonasi";
import JadwalSholatJumat from "@/pages/admin/JadwalSholatJumat"; 
import InventoryForm from "@/pages/admin/InventoryForm";
import LaporanPage from "@/pages/admin/LaporanPage";
import ZisDistributionForm from "@/pages/admin/ZisDistributionForm";
import KegiatanPage from "@/pages/admin/KegiatanPage";
import { ForbiddenPage, NotFoundPage, ServerErrorPage } from "@/pages/error/ErrorPage";
import ZisManagement from "@/pages/admin/ZisManagement";
import UserManagementPage from "./pages/admin/UserManagement";

// Auth
import Login from "@/pages/auth/Login";
import { useAuthStore } from "@/stores";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import InventoryLoansPage from "./inventoryLoans/pages/InventoryLoansPage";
import CongregationPage from "./congregation/pages/CongregationPage";
import MustahikPage from "./mustahik/pages/MustahikPage";

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
				path='/donation'
				element={
					<PublicLayout>
						<DonationPage />
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

			<Route path='/403' element={<ForbiddenPage />} />
			<Route path='/500' element={<ServerErrorPage />} />

			{/* ── ADMIN (PROTECTED) ── */}
			<Route
				path='/admin'
				element={
					<ProtectedRoute resource='dashboard'>
						<AdminLayout>
							<div className='p-6'>Dashboard</div>
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/donasi'
				element={
					<ProtectedRoute resource='donasi'>
						<AdminLayout>
							<DonasiMasukPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/kas'
				element={
					<ProtectedRoute resource='keuangan'>
						<AdminLayout>
							<ManajemenKasPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/pengaturan/jadwal-shalat'
				element={
					<ProtectedRoute resource='pengaturan'>
						<AdminLayout>
							<PrayerConfig />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/pengaturan'
				element={
					<ProtectedRoute resource='profil-masjid'>
						<AdminLayout>
							<MosqueProfileSettings />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/verify-donasi'
				element={
					<ProtectedRoute resource='donasi'>
						<AdminLayout>
							<VerifyDonasi />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/kegiatan'
				element={
					<ProtectedRoute>
						<AdminLayout>
							<JadwalSholatJumat />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>
			
			<Route
				path='/admin/laporan'
				element={
					<ProtectedRoute resource='laporan'>
						<AdminLayout>
							<LaporanPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* ARTIKEL ADMIN */}
			<Route
				path='/admin/artikel'
				element={
					<ProtectedRoute resource='artikel'>
						<AdminLayout>
							<div className='p-6'>Manajemen Artikel (Halaman dalam pengembangan)</div>
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* INVENTARIS */}
			<Route
				path='/admin/inventaris'
				element={
					<ProtectedRoute resource='inventaris'>
						<AdminLayout>
							<InventoryListPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/inventaris/tambah'
				element={
					<ProtectedRoute resource='inventaris'>
						<AdminLayout>
							<InventoryForm />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/inventory-loans'
				element={
					<ProtectedRoute resource='inventaris'>
						<AdminLayout>
							<InventoryLoansPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* JAMAAH */}
			<Route
				path='/admin/jamaah'
				element={
					<ProtectedRoute resource='jamaah'>
						<AdminLayout>
							<CongregationPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/congregation'
				element={
					<ProtectedRoute resource='jamaah'>
						<AdminLayout>
							<CongregationPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/mustahik'
				element={
					<ProtectedRoute resource='jamaah'>
						<AdminLayout>
							<MustahikPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* RUTE MANAJEMEN ZIS */}
            <Route
                path='/admin/zis'
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <ZisManagement />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

			<Route
				path='/admin/zis/distribusi'
				element={
					<ProtectedRoute resource='keuangan'>
						<AdminLayout>
							<ZisDistributionForm />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/kegiatan'
				element={
					<ProtectedRoute resource='kegiatan'>
						<AdminLayout>
							<KegiatanPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/admin/pengurus'
				element={
					<ProtectedRoute resource='pengurus'>
						<AdminLayout>
							<UserManagementPage />
						</AdminLayout>
					</ProtectedRoute>
				}
			/>

			{/* ── FALLBACK ── */}
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
