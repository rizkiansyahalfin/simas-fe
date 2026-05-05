import { create } from 'zustand'

interface AuthStore {
  token: string | null
  user: { id: string; name: string; email: string } | null
  isAuthenticated: boolean
  setAuth: (token: string, user: AuthStore['user']) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

