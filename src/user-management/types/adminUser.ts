export type { Role } from '@/lib/rbac'
export type UserStatus = 'aktif' | 'nonaktif'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: import('@/lib/rbac').Role
  status: UserStatus
  inisial: string
  avatarBg: string
  createdAt: string
}