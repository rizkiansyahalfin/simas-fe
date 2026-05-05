import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'
import { useAuthStore } from '../stores'


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
  }
}

// POST - Login
export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      // Delay agar success state sempat tampil di UI
      setTimeout(() => navigate('/dashboard'), 1200)
    },
  })
}

// POST - Register
export const useRegister = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/register', credentials)
      return data
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      setTimeout(() => navigate('/dashboard'), 1200)
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