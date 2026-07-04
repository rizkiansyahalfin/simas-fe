import { type AdminUser } from '@/user-management/types/adminUser'
import type { Role } from '@/lib/rbac'

export const SEED: AdminUser[] = [
  { id: 'USR-001', name: 'Ahmad Fauzi',    email: 'ahmad@simas.org',  role: 'superadmin',      status: 'aktif',    inisial: 'AF', avatarBg: 'bg-violet-600',  createdAt: '01 Jan 2024' },
  { id: 'USR-002', name: 'Siti Rahayu',    email: 'siti@simas.org',   role: 'bendahara',       status: 'aktif',    inisial: 'SR', avatarBg: 'bg-sky-600',     createdAt: '15 Jan 2024' },
  { id: 'USR-003', name: 'Budi Santoso',   email: 'budi@simas.org',   role: 'sekretaris',      status: 'aktif',    inisial: 'BS', avatarBg: 'bg-emerald-600', createdAt: '20 Jan 2024' },
  { id: 'USR-004', name: 'Dewi Nurhaliza', email: 'dewi@simas.org',   role: 'operator',        status: 'aktif',    inisial: 'DN', avatarBg: 'bg-pink-600',    createdAt: '01 Feb 2024' },
  { id: 'USR-005', name: 'Hasan Basri',    email: 'hasan@simas.org',  role: 'bendahara',       status: 'nonaktif', inisial: 'HB', avatarBg: 'bg-amber-600',   createdAt: '10 Feb 2024' },
  { id: 'USR-006', name: 'Nur Hidayah',    email: 'nur@simas.org',    role: 'operator',        status: 'aktif',    inisial: 'NH', avatarBg: 'bg-teal-600',    createdAt: '15 Feb 2024' },
  { id: 'USR-007', name: 'Admin Kegiatan', email: 'kegiatan@simas.org', role: 'admin kegiatan', status: 'aktif',    inisial: 'AK', avatarBg: 'bg-orange-600',  createdAt: '01 Mar 2024' },
  { id: 'USR-008', name: 'Admin Inventaris', email: 'inventaris@simas.org', role: 'admin inventaris', status: 'aktif', inisial: 'AI', avatarBg: 'bg-cyan-600', createdAt: '01 Mar 2024' },
]

export const ROLE_CFG: Record<Role, { label: string; badgeCls: string }> = {
  superadmin:      { label: 'Superadmin',       badgeCls: 'um-badge-superadmin' },
  bendahara:       { label: 'Bendahara',        badgeCls: 'um-badge-bendahara'  },
  sekretaris:      { label: 'Sekretaris',       badgeCls: 'um-badge-sekretaris' },
  operator:        { label: 'Operator',         badgeCls: 'um-badge-operator'   },
  'admin kegiatan':  { label: 'Admin Kegiatan',   badgeCls: 'um-badge-sekretaris' },
  'admin inventaris': { label: 'Admin Inventaris', badgeCls: 'um-badge-operator'   },
}