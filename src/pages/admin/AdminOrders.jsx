import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../../lib/api.js'

const STATUS_OPTIONS = [
  'draft',
  'pending_payment',
  'reserved',
  'paid',
  'awaiting_details',
  'awaiting_id',
  'processing',
  'submitted',
  'completed',
  'cancelled',
  'refunded',
]

const PAYMENT_OPTIONS = ['unpaid', 'paid', 'failed', 'refunded']
const ID_OPTIONS = ['not_required', 'pending', 'submitted', 'approved', 'rejected']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState('')
  const [drafts, setDrafts] = useState({})

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    const params = filter === 'all' ? {} : { status: filter }
    adminApi
      .orders(params)
      .then((data) => {
        const list = data.orders || []
        setOrders(list)
        const next = {}
        list.forEach((o) => {
          next[o._id] = {
            status: o.status || '',
            paymentStatus: o.paymentStatus || 'unpaid',
            idVerificationStatus: o.idVerificationStatus || 'pending',
            adminNotes: o.adminNotes || '',
          }
        })
        setDrafts(next)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  function updateDraft(id, field, value) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  async function save(id) {
    setSavingId(id)
    setError('')
    try {
      const body = drafts[id]
      await adminApi.updateOrderStatus(id, body)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingId('')
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <h2>Orders &amp; ID status</h2>
        <label>
          Filter status
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="auth-error">{error}</p> : null}
      {loading ? <p>Loading orders...</p> : null}
      {!loading && orders.length === 0 ? <p>No orders found.</p> : null}

      <div className="admin-order-list">
        {orders.map((order) => {
          const draft = drafts[order._id] || {}
          return (
            <article key={order._id} className="admin-order-card">
              <div className="admin-order-top">
                <div>
                  <h3>{order.orderNumber}</h3>
                  <p>
                    {order.companyName || order.items?.[0]?.title || 'Order'} ·{' '}
                    {order.orderType === 'shelf_sale' ? 'Shelf / sale' : 'Formation'}
                  </p>
                  <p className="portal-meta">
                    {order.user?.name || 'Customer'} · {order.user?.email || '-'} ·{' '}
                    {order.user?.phone || 'no phone'}
                  </p>
                </div>
                <p className="admin-order-total">£{Number(order.total || 0).toFixed(2)}</p>
              </div>

              <div className="admin-order-controls">
                <label>
                  Status
                  <select
                    value={draft.status}
                    onChange={(e) => updateDraft(order._id, 'status', e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Payment
                  <select
                    value={draft.paymentStatus}
                    onChange={(e) => updateDraft(order._id, 'paymentStatus', e.target.value)}
                  >
                    {PAYMENT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  ID verification
                  <select
                    value={draft.idVerificationStatus}
                    onChange={(e) => updateDraft(order._id, 'idVerificationStatus', e.target.value)}
                  >
                    {ID_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="admin-notes-label">
                Admin notes
                <textarea
                  rows={2}
                  value={draft.adminNotes}
                  onChange={(e) => updateDraft(order._id, 'adminNotes', e.target.value)}
                />
              </label>

              <button
                type="button"
                className="btn btn-primary"
                disabled={savingId === order._id}
                onClick={() => save(order._id)}
              >
                {savingId === order._id ? 'Saving…' : 'Save changes'}
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
