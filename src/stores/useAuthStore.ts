import { create } from 'zustand'
import type { Role } from '@/lib/rbac'

export interface AuthUser {
  id: string
  name: string
  email: string
  username?: string
  role: Role
}

interface SetAuthPayload {
  token: string
  user: AuthUser
  redirectTo?: string
}

interface LogoutOptions {
  redirectTo?: string
}

interface AuthStore {
  token: string | null
  user: AuthUser | null
  role: Role | null
  isAuthenticated: boolean

  setAuth: (payload: SetAuthPayload) => void
  logout: (options?: LogoutOptions) => void
}

function getStoredToken(): string | null {
  const token = sessionStorage.getItem('token')
  if (!token || token === 'null' || token === 'undefined') return null
  return token
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem('user')
    if (!raw || raw === 'null' || raw === 'undefined') return null

    const user = JSON.parse(raw) as Partial<AuthUser>
    const role = user.role ?? (sessionStorage.getItem('role') as Role | null)
    if (!user.id || !user.name || !user.email || !role) return null

    return { ...user, role } as AuthUser
  } catch {
    return null
  }
}

function persistAuth(token: string, user: AuthUser) {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('user', JSON.stringify(user))
  sessionStorage.setItem('role', user.role)
}

function clearAuthStorage() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('role')
}

function redirectTo(path?: string) {
  if (!path || window.location.pathname === path) return
  window.location.href = path
}

export const useAuthStore = create<AuthStore>((set) => {
  const token = getStoredToken()
  const storedUser = getStoredUser()
  const isAuthenticated = Boolean(token && storedUser)
  const user = isAuthenticated ? storedUser : null

  if (!isAuthenticated) {
    clearAuthStorage()
  }

  return {
    token: isAuthenticated ? token : null,
    user,
    role: user?.role ?? null,
    isAuthenticated,

    setAuth: ({ token, user, redirectTo: nextPath }) => {
      persistAuth(token, user)

      set({
        token,
        user,
        role: user.role,
        isAuthenticated: true,
      })

      redirectTo(nextPath)
    },

    logout: (options) => {
      clearAuthStorage()

      set({
        token: null,
        user: null,
        role: null,
        isAuthenticated: false,
      })

      redirectTo(options?.redirectTo)
    },
  }
})
