import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <section className="portal-loading">
        <div className="container">Loading account...</div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
