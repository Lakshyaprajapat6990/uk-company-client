import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/auth.jsx'
import { hasPermission } from '../../lib/permissions.js'

const TABS = [
  { to: '/admin', end: true, label: 'Overview', permission: 'overview' },
  { to: '/admin/orders', label: 'Orders & ID', permission: 'orders' },
  { to: '/admin/companies', label: 'Companies for sale', permission: 'companies' },
  { to: '/admin/users', label: 'Users', permission: 'users' },
  { to: '/admin/subscribers', label: 'Subscribers', permission: 'subscribers' },
  { to: '/admin/homepage', label: 'Homepage', permission: 'homepage' },
  { to: '/admin/staff', label: 'Admins', superAdminOnly: true },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const isSuper = user?.role === 'super_admin'
  const visibleTabs = TABS.filter((tab) => {
    if (tab.superAdminOnly) return isSuper
    return hasPermission(user, tab.permission)
  })

  return (
    <section className="admin-page">
      <div className="container">
        <header className="admin-header">
          <div>
            <p className="section-label">{isSuper ? 'Super Admin' : 'Admin CMS'}</p>
            <h1>Admin console</h1>
            <p className="admin-lead">
              Manage orders, ID status and customers. Signed in as {user?.email || 'admin'}
              {isSuper ? ' (full access)' : ''}.
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
          {visibleTabs.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={Boolean(tab.end)}>
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <Outlet />
      </div>
    </section>
  )
}
