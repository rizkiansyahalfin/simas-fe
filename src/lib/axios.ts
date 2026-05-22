import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout({ redirectTo: '/login' })
    }
    return Promise.reject(error)
  }
)

export const isRateLimited = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'response' in error &&
  (error as { response: { status: number } }).response.status === 429

export default api
