import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import {
  firstAllowedAdminPath,
  hasPermission,
  isStaffUser,
} from '../lib/permissions.js'

/** Requires signed-in staff. Optional module permission gate. */
export default function AdminRoute({ children, permission, superAdminOnly = false }) {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <section className="portal-loading">
        <div className="container">Loading admin...</div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!isStaffUser(user)) {
    return <Navigate to="/portal" replace />
  }

  if (superAdminOnly && user.role !== 'super_admin') {
    return (
      <section className="admin-denied">
        <div className="container">
          <h2>Super Admin only</h2>
          <p>Only the Super Admin can manage staff accounts and module access.</p>
          <Link to={firstAllowedAdminPath(user)} className="btn btn-primary">
            Back to admin
          </Link>
        </div>
      </section>
    )
  }

  if (permission && !hasPermission(user, permission)) {
    return (
      <section className="admin-denied">
        <div className="container">
          <h2>Access denied</h2>
          <p>Your admin account does not include this module.</p>
          <Link to={firstAllowedAdminPath(user)} className="btn btn-primary">
            Go to an available section
          </Link>
        </div>
      </section>
    )
  }

  return children
}
