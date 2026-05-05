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

/**
 * Validasi token dari localStorage.
 * Untuk sekarang cukup cek tidak kosong & bukan string literal 'null'/'undefined'.
 * Nanti bisa diganti dengan JWT decode / expiry check.
 */
function getStoredToken(): string | null {
  const t = localStorage.getItem('token')
  if (!t || t === 'null' || t === 'undefined') return null
  return t
}

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('user')
    if (!raw || raw === 'null') return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

const storedToken = getStoredToken()
const storedUser  = getStoredUser()

export const useAuthStore = create<AuthStore>(() => ({
  token:           storedToken,
  user:            storedUser,
  isAuthenticated: !!storedToken,

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    useAuthStore.setState({ token, user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    useAuthStore.setState({ token: null, user: null, isAuthenticated: false })
  },
}))