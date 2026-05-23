export type Role = 'superadmin' | 'bendahara' | 'admin kegiatan' | 'admin inventaris';

export const canAccess = (role: Role, resource: string) => {
  // Superadmin melihat semua menu
  if (role === 'superadmin') return true;

  switch (resource) {
    // Bendahara: Keuangan, Donasi, Laporan
    case 'keuangan':
    case 'donasi':
    case 'laporan':
      return role === 'bendahara';

    // Admin Kegiatan: Artikel, Kegiatan, Jadwal Jumat
    case 'artikel':
    case 'kegiatan':
    case 'jadwal-jumat':
      return role === 'admin kegiatan';

    // Admin Inventaris: Inventaris
    case 'inventaris':
      return role === 'admin inventaris';

    // Dashboard bisa diakses semua role yang udah login
    case 'dashboard':
    case 'pengaturan': // Asumsi semua role bisa buka Pengaturan Akun mereka sendiri
      return true;

    case 'profil-masjid':
      return false;

    case 'audit-log':
      return false;

    default:
      return false;
  }
};
