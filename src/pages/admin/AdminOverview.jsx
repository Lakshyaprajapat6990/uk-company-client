import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../../lib/api.js'

function money(n) {
  return `£${Number(n || 0).toFixed(2)}`
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi
      .stats()
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="admin-panel">
      {error ? <p className="auth-error">{error}</p> : null}
      {loading ? <p>Loading stats...</p> : null}

      {stats ? (
        <div className="admin-stat-grid">
          <article className="admin-stat-card">
            <p>Customers</p>
            <strong>{stats.customers}</strong>
          </article>
          <article className="admin-stat-card">
            <p>Orders</p>
            <strong>{stats.orders}</strong>
          </article>
          <article className="admin-stat-card">
            <p>Paid orders</p>
            <strong>{stats.paidOrders}</strong>
          </article>
          <article className="admin-stat-card">
            <p>Paid revenue</p>
            <strong>{money(stats.revenue)}</strong>
          </article>
          <article className="admin-stat-card">
            <p>Companies for sale</p>
            <strong>{stats.companies ?? '-'}</strong>
          </article>
          <article className="admin-stat-card">
            <p>Active services</p>
            <strong>{stats.activeServices}</strong>
          </article>
        </div>
      ) : null}

      <div className="admin-quick-links">
        <h2>Quick links</h2>
        <ul>
          <li>
            <Link to="/admin/orders">Review orders &amp; ID verification status</Link>
          </li>
          <li>
            <Link to="/admin/companies">Browse companies-for-sale catalogue</Link>
          </li>
          <li>
            <Link to="/admin/users">Customer accounts</Link>
          </li>
          <li>
            <Link to="/ecosystem">UK.company vs MyUKPost / sister sites</Link>
          </li>
        </ul>
        <p className="admin-note">
          This is an operational demo for Nick. Live Stripe, email notifications and Companies House
          filing remain separate integrations.
        </p>
      </div>
    </div>
  )
}
