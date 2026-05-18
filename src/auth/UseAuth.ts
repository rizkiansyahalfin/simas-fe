import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'
import { useAuthStore } from '../stores'
import type { Role } from '@/lib/rbac'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role?: Role
  }
}

function withDefaultRole(user: AuthResponse['user']) {
  return {
    ...user,
    role: user.role ?? ('superadmin' as Role),
  }
}

// POST - Login
export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      // Delay agar success state sempat tampil di UI
      setTimeout(() => {
        setAuth({
          token: data.token,
          user: withDefaultRole(data.user),
          redirectTo: '/admin',
        })
      }, 1200)
    },
  })
}

// POST - Register
export const useRegister = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/register', credentials)
      return data
    },
    onSuccess: (data) => {
      setTimeout(() => {
        setAuth({
          token: data.token,
          user: withDefaultRole(data.user),
          redirectTo: '/admin',
        })
      }, 1200)
    },
  })
}

// Logout (tidak perlu API call, cukup clear store)
export const useLogout = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  return () => {
    logout()
    navigate('/login')
  }
}
