import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
}

interface AuthStore {
  token: string | null
  user: User | null
  isAuthenticated: boolean

  setAuth: (token: string, user: User) => void
  logout: () => void
}

/* ─── Helper ───────────────────── */

function getStoredToken(): string | null {
  const t = localStorage.getItem('token')
  if (!t || t === 'null' || t === 'undefined') return null
  return t
}

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('user')
    if (!raw || raw === 'null') return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/* ─── Store ───────────────────── */

export const useAuthStore = create<AuthStore>((set) => {
  const token = getStoredToken()
  const user = getStoredUser()

  return {
    token,
    user,
    isAuthenticated: !!token,

    setAuth: (token, user) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({
        token,
        user,
        isAuthenticated: true,
      })
    },

    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      })
    },
  }
})