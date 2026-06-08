import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { useAuthStore } from "@/stores";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ForbiddenPage, NotFoundPage, ServerErrorPage } from "@/components/error/ErrorPage";
import Events from "./Events/pages/PublicEventsPage";
import EventDetailPage from "./Events/pages/EventDetailPage";
import PaymentManagementPage from "./payments/pages/PaymentManagementPage";

// === TAMBAHAN IMPORT THEME PROVIDER ===
import { ThemeProvider } from "@/components/ThemeProvider";

// ==================== PUBLIC PAGES ====================
const Home = lazy(() => import("./home/pages/HomePage"));
const Articles = lazy(() => import("./articles/pages/PublicArticlesPage"));
const ArticleDetail = lazy(() => import("./articles/pages/PublicArticleDetailPage"));

const JadwalSholatPage = lazy(() => import("./prayer/pages/JadwalSholatPage"));
const DonationPage = lazy(() => import("./publicDonation/pages/DonationPage"));
const GalleryPage = lazy(() => import("./gallery/pages/PublicGalleryPage"));
const CampaignListPage = lazy(() => import("./campaigns/pages/CampaignListPage"));
const CampaignHistoryPage = lazy(() => import("./campaigns/pages/CampaignHistoryPage"));
import PaymentStatusPage from "@/payments/pages/PaymentStatusPage";

// ==================== ADMIN PAGES ====================
const DonasiMasukPage = lazy(() => import("./donations/pages/DonasiMasukPage"));
const ManajemenKasPage = lazy(() => import("./cash/pages/ManajemenKasPage"));
const InventoryListPage = lazy(() => import("./inventory/pages/InventoryListPage"));
const PrayerConfig = lazy(() => import("./prayer/pages/PrayerConfigPage"));
const MosqueProfileSettings = lazy(() => import("./mosque-profile/pages/MosqueProfileSettingsPage"));
const VerifyDonasi = lazy(() => import("./donations/pages/VerifyDonasiPage"));
const InventoryForm = lazy(() => import("./inventory/pages/InventoryFormPage"));
const LaporanPage = lazy(() => import("./reports/pages/LaporanPage"));
const ZisDistributionForm = lazy(() => import("./zis/pages/ZisDistributionFormPage"));
const KegiatanPage = lazy(() => import("./activities/pages/KegiatanPage"));
const ZisManagement = lazy(() => import("./zis/pages/ZisManagementPage"));
const UserManagementPage = lazy(() => import("./user-management/pages/UserManagementPage"));
const DashboardPage = lazy(() => import("./dashboard/pages/DashboardPage"));
const AuditLogPage = lazy(() => import("./audit-log/pages/AuditLogPage"));
const InventoryDetailPage = lazy(() => import("./inventory/pages/InventoryDetailPage"));
const ProfilePage = lazy(() => import("./user-profile/pages/ProfilePage"));
const Login = lazy(() => import("./auth/pages/LoginPage"));
const InventoryLoansPage = lazy(() => import("./inventoryLoans/pages/InventoryLoansPage"));
const CongregationPage = lazy(() => import("./congregation/pages/CongregationPage"));
const MustahikPage = lazy(() => import("./mustahik/pages/MustahikPage"));
const AdminGalleryPage = lazy(() => import("./gallery/pages/AdminGalleryPage"));
const CongregationDetailPage = lazy(() => import("./congregation-detail/pages/CongregationDetailPage"));
const CongregationImportPage = lazy(() => import("./congregation-import/pages/CongregationImportPage"));
const AdminCampaignManagementPage = lazy(() => import("./campaigns/pages/AdminCampaignManagementPage"));
const AboutPage = lazy(() => import("./about/pages/AboutPages"));


const AttendanceSessionsPage = lazy(() => import("@/pages/admin/AttendanceSessionsPage"));

function App() {
    const { isAuthenticated } = useAuthStore();

    return (
        // === TAMBAHAN WRAPPER THEME PROVIDER ===
        <ThemeProvider defaultTheme="system" storageKey="simas-theme">
            <Toaster position='top-right' richColors />
            <Suspense
                fallback={
                    <div className='flex items-center justify-center min-h-screen'>
                        <div className='animate-pulse text-slate-400'>Memuat...</div>
                    </div>
                }
            >
                <Routes>
                    {/* PUBLIC ROUTES */}
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
                    <Route
                        path='/galeri'
                        element={
                            <PublicLayout>
                                <GalleryPage />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path='/berita'
                        element={
                            <PublicLayout>
                                <div>Berita Page</div>
                            </PublicLayout>
                        }
                    />
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
                    <Route
                        path='/campaigns'
                        element={
                            <PublicLayout>
                                <CampaignListPage />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path='/campaigns/history'
                        element={
                            <PublicLayout>
                                <CampaignHistoryPage />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path='/events/:id'
                        element={
                            <PublicLayout>
                                <EventDetailPage />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path='/about'
                        element={
                            <PublicLayout>
                                <AboutPage />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path='/payment-status'
                        element={
                            <PublicLayout>
                                <PaymentStatusPage />
                            </PublicLayout>
                        }
                    />

                    {/* LOGIN */}
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

                    {/* ERROR PAGES */}
                    <Route path='/403' element={<ForbiddenPage />} />
                    <Route path='/500' element={<ServerErrorPage />} />

                    {/* ADMIN CAMPAIGN MANAGEMENT (khusus) */}
                    <Route
                        path='/admin/campaigns'
                        element={
                            <ProtectedRoute resource='donasi'>
                                <AdminLayout>
                                    <AdminCampaignManagementPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />

                    {/* ADMIN PROTECTED ROUTES */}
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute resource='dashboard'>
                                <AdminLayout>
                                    <DashboardPage />
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
                        path='/admin/profil'
                        element={
                            <ProtectedRoute resource='user-profile'>
                                <AdminLayout>
                                    <ProfilePage />
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
                        path='/admin/laporan'
                        element={
                            <ProtectedRoute resource='laporan'>
                                <AdminLayout>
                                    <LaporanPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
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
                    
                    {/* === ROUTE BARU: ABSENSI === */}
                    <Route
                        path='/admin/attendance'
                        element={
                            <ProtectedRoute resource='kegiatan'>
                                <AdminLayout>
                                    <AttendanceSessionsPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/admin/inventaris/:id'
                        element={
                            <ProtectedRoute resource='inventaris'>
                                <AdminLayout>
                                    <InventoryDetailPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
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
                    <Route
                        path='/admin/zis'
                        element={
                            <ProtectedRoute resource='keuangan'>
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
                    <Route
                        path='/admin/audit-log'
                        element={
                            <ProtectedRoute resource='audit-log'>
                                <AdminLayout>
                                    <AuditLogPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/gallery'
                        element={
                            <ProtectedRoute resource='gallery'>
                                <AdminLayout>
                                    <AdminGalleryPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/congregations/:id'
                        element={
                            <ProtectedRoute resource='congregationdetail'>
                                <AdminLayout>
                                    <CongregationDetailPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/congregations/import'
                        element={
                            <ProtectedRoute resource='congregationdetail'>
                                <AdminLayout>
                                    <CongregationImportPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/payments'
                        element={
                            <ProtectedRoute resource='payments'>
                                <AdminLayout>
                                    <PaymentManagementPage />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />

                    {/* FALLBACK */}
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;