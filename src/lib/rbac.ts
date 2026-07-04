export type Role = 'superadmin' | 'bendahara' | 'sekretaris' | 'operator' | 'admin kegiatan' | 'admin inventaris';

export const canAccess = (role: Role, resource: string) => {
  if (role === 'superadmin') return true;

  switch (resource) {
    case 'keuangan':
    case 'donasi':
    case 'laporan':
      return role === 'bendahara' || role === 'operator';

    case 'artikel':
    case 'kegiatan':
    case 'jadwal-jumat':
      return role === 'admin kegiatan' || role === 'sekretaris';

    case 'inventaris':
      return role === 'admin inventaris' || role === 'operator';

    case 'jamaah':
    case 'congregationdetail':
      return role === 'sekretaris' || role === 'admin kegiatan';

    case 'gallery':
    case 'pengurus':
      return role === 'sekretaris';

    case 'dashboard':
    case 'pengaturan':
    case 'profil-masjid':
      return true;

    case 'audit-log':
      return false;

    default:
      return false;
  }
};
