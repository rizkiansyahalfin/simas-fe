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

interface AuthUser {
  id: string
  name: string
  email: string
  username?: string
  role?: Role
}

interface AuthResponse {
  token: string
  user: AuthUser
}

interface AuthApiResponse {
  success: boolean
  data: AuthResponse
}

function withDefaultRole(user: AuthUser) {
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
      const { data: res } = await api.post<AuthApiResponse>('/api/auth/login', credentials)
      return res.data
    },
    onSuccess: (payload) => {
      setTimeout(() => {
        setAuth({
          token: payload.token,
          user: withDefaultRole(payload.user),
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
      const { data: res } = await api.post<AuthApiResponse>('/api/auth/register', credentials)
      return res.data
    },
    onSuccess: (payload) => {
      setTimeout(() => {
        setAuth({
          token: payload.token,
          user: withDefaultRole(payload.user),
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
