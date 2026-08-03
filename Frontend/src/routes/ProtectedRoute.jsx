import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}
