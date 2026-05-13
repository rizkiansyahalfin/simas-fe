// src/lib/canAccess.ts

type Role =
  | 'superadmin'
  | 'bendahara'
  | 'admin_kegiatan'
  | 'admin_inventaris'

type Resource =
  | 'keuangan'
  | 'donasi'
  | 'laporan'
  | 'artikel'
  | 'kegiatan'
  | 'jadwal_jumat'
  | 'inventaris'

const permissions: Record<
  Role,
  Resource[]
> = {
  superadmin: [
    'keuangan',
    'donasi',
    'laporan',
    'artikel',
    'kegiatan',
    'jadwal_jumat',
    'inventaris',
  ],

  bendahara: [
    'keuangan',
    'donasi',
    'laporan',
  ],

  admin_kegiatan: [
    'artikel',
    'kegiatan',
    'jadwal_jumat',
  ],

  admin_inventaris: [
    'inventaris',
  ],
}

export function canAccess(
  role: Role,
  resource: Resource
) {
  return permissions[
    role
  ]?.includes(resource)
}