import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/auth.jsx'

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <section className="admin-page">
      <div className="container">
        <header className="admin-header">
          <div>
            <p className="section-label">CMS demo</p>
            <h1>Admin console</h1>
            <p className="admin-lead">
              Manage orders, ID status and customers. Signed in as {user?.email || 'admin'}.
            </p>
          </div>
          <div className="admin-header-actions">
            <Link to="/portal" className="btn btn-outline">
              Customer portal
            </Link>
            <button type="button" className="btn btn-outline" onClick={logout}>
              Log out
            </button>
          </div>
        </header>

        <nav className="admin-tabs" aria-label="Admin sections">
          <NavLink to="/admin" end>
            Overview
          </NavLink>
          <NavLink to="/admin/orders">Orders &amp; ID</NavLink>
          <NavLink to="/admin/companies">Companies for sale</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
        </nav>

        <Outlet />
      </div>
    </section>
  )
}
