import { Navigate, useLocation } from 'react-router-dom'
import { canAccess } from '@/lib/rbac'
import { useAuthStore } from '@/stores'

interface ProtectedRouteProps {
  children: React.ReactNode
  resource?: string
}

export function ProtectedRoute({ children, resource }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (resource && !canAccess(role, resource)) {
    return <Navigate to="/403" replace />
  }

  return children
}
