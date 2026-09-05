import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { ordersApi } from '../lib/api.js'

export default function PortalDashboard() {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi
      .mine()
      .then((data) => setOrders(data.orders || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="portal-page">
      <div className="container">
        <div className="portal-header">
          <div>
            <p className="section-label">
              {user?.role === 'admin' ? 'Admin · customer view' : 'Customer portal'}
            </p>
            <h1>Welcome{user?.name ? `, ${user.name}` : ''}</h1>
            <p className="portal-lead">
              Track UK.company orders, complete formation or transfer details, and upload ID
              documents. This portal is not your MyUKPost mail account - address products checkout on{' '}
              <Link to="/myukpost">MyUKPost.com</Link>.
            </p>
          </div>
          <div className="hero-actions">
            {user?.role === 'admin' ? (
              <Link to="/admin" className="btn btn-primary">
                Open admin CMS
              </Link>
            ) : null}
            <button type="button" className="btn btn-outline" onClick={logout}>
              Log out
            </button>
          </div>
        </div>

        {error ? <p className="auth-error">{error}</p> : null}
        {loading ? <p>Loading orders...</p> : null}

        <div className="portal-orders">
          <h2>My orders</h2>
          {!loading && orders.length === 0 ? (
            <p>
              No orders yet.{' '}
              <Link to="/companies-for-sale">Browse companies for sale</Link> or{' '}
              <Link to="/formations">formation packages</Link>
            </p>
          ) : null}
          <div className="portal-order-list">
            {orders.map((order) => (
              <article key={order._id} className="portal-order-card">
                <div>
                  <h3>{order.orderNumber}</h3>
                  <p>{order.companyName || order.items?.[0]?.title || 'Formation order'}</p>
                  <p className="portal-meta">
                    {order.orderType === 'shelf_sale' ? 'Company for sale' : 'Formation'} · Status:{' '}
                    <strong>{order.status}</strong> · Payment: {order.paymentStatus} · £
                    {Number(order.total).toFixed(2)}
                  </p>
                </div>
                <Link className="btn btn-primary" to={`/portal/orders/${order._id}`}>
                  Open
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
