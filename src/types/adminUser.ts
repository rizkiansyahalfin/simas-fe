export type Role = 'superadmin' | 'bendahara' | 'sekretaris' | 'operator'
export type UserStatus = 'aktif' | 'nonaktif'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: Role
  status: UserStatus
  inisial: string
  avatarBg: string
  createdAt: string
}